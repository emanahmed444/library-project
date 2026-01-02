import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Box, CircularProgress, 
  Alert, TextField, IconButton, Tabs, Tab,
} from "@mui/material";

import BookIcon from "@mui/icons-material/Book";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CategoryIcon from "@mui/icons-material/Category";
import HistoryIcon from "@mui/icons-material/History";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const api = axios.create({ baseURL: "http://localhost:5000" });

function Books({ keycloak }) {
  const [activeTab, setActiveTab] = useState(0); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  const authHeaders = async () => {
    await keycloak.updateToken(30);
    return { Authorization: `Bearer ${keycloak.token}` };
  };

  const getEndpointByTab = () => {
    if (activeTab === 1) return "/api/categories-with-books"; 
    if (activeTab === 2) return "/api/borrows";
    return "/api/books";
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = await authHeaders();
      const endpoint = getEndpointByTab();
      const response = await api.get(endpoint, { headers });
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) return alert("Please fill all fields");
    try {
      const headers = await authHeaders();
      const response = await api.post("/api/books", newBook, { headers });
      if (response.status === 201) {
        alert("✅ Book Added & Categorized Successfully");
        setNewBook({ title: "", author: "" });
        fetchData();
      }
    } catch (err) { alert("⚠️ Access Denied or Server Error"); }
  };

  const handleBorrow = async (bookId) => {
    try {
      const headers = await authHeaders();
      const response = await api.post("/api/borrows", { book_id: bookId }, { headers });
      if (response.status === 201) alert("✅ Book borrowed successfully!");
    } catch (err) { alert("❌ Failed to borrow book."); }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const headers = await authHeaders();
      await api.delete(`/api/books/${id}`, { headers });
      fetchData();
    } catch (err) { alert("🚫 Forbidden or Error"); }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", display: "flex", alignItems: "center", color: "#2c3e50" }}>
        <LibraryBooksIcon sx={{ mr: 2, fontSize: 40 }} /> Secure Library Management
      </Typography>

      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} centered indicatorColor="primary" textColor="primary">
          <Tab icon={<BookIcon />} label="Books Inventory" />
          <Tab icon={<CategoryIcon />} label="Categories (Authors)" />
          <Tab icon={<HistoryIcon />} label="Borrowing Records" />
        </Tabs>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {activeTab === 0 && keycloak.hasRealmRole("admin") && (
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3, backgroundColor: "#fdfcfb", border: "1px solid #eee" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#8d6e63" }}>Admin Panel: Add New Book</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="Book Title" size="small" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} sx={{ flex: 1 }} />
            <TextField label="Author Name" size="small" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} sx={{ flex: 1 }} />
            <Button variant="contained" startIcon={<AddBoxIcon />} onClick={handleAddBook}>Add Book</Button>
          </Box>
        </Paper>
      )}

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#34495e" }}>
            <TableRow>
              {activeTab === 0 && (<><TableCell sx={{ color: "white" }}>Title</TableCell><TableCell sx={{ color: "white" }}>Author</TableCell><TableCell sx={{ color: "white", textAlign: "center" }}>Actions</TableCell></>)}
              {activeTab === 1 && (<><TableCell sx={{ color: "white", fontWeight: "bold" }}>Author / Category</TableCell><TableCell sx={{ color: "white", fontWeight: "bold" }}>Books Under This Author</TableCell></>)}
              {activeTab === 2 && (<><TableCell sx={{ color: "white" }}>User</TableCell><TableCell sx={{ color: "white" }}>Book Borrowed</TableCell><TableCell sx={{ color: "white" }}>Date</TableCell></>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (<TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>) : (
              data.map((item, idx) => (
                <TableRow key={idx} hover>
                  {activeTab === 0 && (<><TableCell>{item.title}</TableCell><TableCell>{item.author}</TableCell><TableCell sx={{ textAlign: "center" }}>
                        {keycloak.hasRealmRole("admin") ? <IconButton color="error" onClick={() => handleDeleteBook(item.id)}><DeleteIcon /></IconButton> : 
                        <Button variant="contained" color="secondary" size="small" onClick={() => handleBorrow(item.id)}>Borrow</Button>}
                      </TableCell></>)}
                  
                  {activeTab === 1 && (<>
                      <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>{item.category_name}</TableCell>
                      <TableCell>
                        {/* التعديل الوقائي هنا: استخدام ?. يمنع انهيار التطبيق لو كانت مصفوفة الكتب غير موجودة */}
                        {item.books?.map((book, i) => (
                          <Box key={i} sx={{ mb: 0.5 }}>• {book}</Box>
                        ))}
                      </TableCell>
                  </>)}

                  {activeTab === 2 && (<><TableCell>{item.username}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{item.title}</TableCell><TableCell>{new Date(item.borrow_date).toLocaleString()}</TableCell></>)}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Books;
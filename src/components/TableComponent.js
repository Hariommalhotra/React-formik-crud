import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
  Grid, Item, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const TableComponent = ({ data, onUpdate, onDelete, onCopy, selectedRow, onSelectRow, setIsEditing, setEditingRow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (field === sortedField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortedField === null) return 0;
    const aValue = a[sortedField];
    const bValue = b[sortedField];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const numericFields = ['age'];

  const calculateTotals = (data) => {
    const totals = {};
    numericFields.forEach((field) => {
      totals[field] = data.reduce((sum, row) => sum + parseFloat(row[field] || 0), 0);
    });
    return totals;
  };

  const totals = calculateTotals(filteredData);

  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
<h2>Form Data Table</h2>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            margin="normal"
            size="small"
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{background:'#BDCDD6'}}>
            <TableRow>
              <TableCell sx={{cursor:"pointer"}} onClick={() => handleSort('name')}>Name</TableCell>
              <TableCell sx={{cursor:"pointer"}} onClick={() => handleSort('age')}>Age</TableCell>
              <TableCell sx={{cursor:"pointer"}} onClick={() => handleSort('gender')}>Gender</TableCell>
              <TableCell sx={{cursor:"pointer"}} onClick={() => handleSort('country')}>Country</TableCell>
              <TableCell sx={{cursor:"pointer"}} onClick={() => handleSort('email')}>Email</TableCell>
              <TableCell sx={{cursor:"pointer"}} onClick={() => handleSort('phoneNumber')}>
                Phone Number
              </TableCell>
              <TableCell  sx={{cursor:"pointer"}}onClick={() => handleSort('favoriteColor')}>
                Favorite Color
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.favoriteColor}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setIsEditing(true);
                      setEditingRow(row);
                      onSelectRow(row);
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => onCopy(row)}>
                      <FileCopyIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
              <TableRow>
              <TableCell colSpan={1}><b>Summary</b></TableCell>
              {numericFields.map((field) => (
                <TableCell key={field}>
                  <Typography variant="subtitle1"><b>{totals[field]}</b></Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableComponent;

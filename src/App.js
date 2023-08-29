import React, { useState } from 'react';
import Form from './components/Form';
import TableComponent from './components/TableComponent';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  console.log(editingRow,'editingRow row');
console.log(selectedRow,'selected row');


const handleFormSubmit = (formData) => {
  console.log('in handle submit ');
  if (isEditing) {
    console.log('in if');
    handleUpdate(formData); // Call the update function
  } else {
    const id = uuidv4();
    const formDataWithId = { ...formData, id };
    setTableData([...tableData, formDataWithId]);
  }
  document.getElementById('myForm').reset();
};

const handleUpdate = (updatedData) => {
  console.log(updatedData,'updated data');
  const updatedTableData = tableData.map((row) =>
    row.id === editingRow.id ? { ...row, ...updatedData } : row
  );
  setTableData(updatedTableData);
  setIsEditing(false);
  setEditingRow(null);
};
  

  const handleDelete = (rowToDelete) => {
    const updatedTableData = tableData.filter((row) => row.id !== rowToDelete.id);
    setTableData(updatedTableData);
  };

  const handleCopy = (rowToCopy) => {
    const id = uuidv4();
    const copiedRow = { ...rowToCopy, id };
    setTableData([...tableData, copiedRow]);
  };
  const handleSelectRow = (row) => {
    setSelectedRow(row);
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} isEditing={isEditing} editingRow={editingRow} />
      <TableComponent
        data={tableData}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCopy={handleCopy}
        selectedRow={selectedRow}
        onSelectRow={handleSelectRow} 
        setIsEditing={setIsEditing} 
        setEditingRow={setEditingRow}
      />
    </div>
  );
};

export default App;

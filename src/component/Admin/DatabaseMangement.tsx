import type React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Search, Edit, Delete, Upload, Download } from "@mui/icons-material";
import { useState, useRef } from "react";
import axios from "axios";

// Mock data
const mockDatabaseEntries = [
  {
    id: 1,
    phoneNumber: "+1 555-123-4567",
    country: "United States",
    carrier: "Verizon",
    type: "Mobile",
    region: "California",
  },
  {
    id: 2,
    phoneNumber: "+44 20 1234 5678",
    country: "United Kingdom",
    carrier: "Vodafone",
    type: "Landline",
    region: "London",
  },
  {
    id: 3,
    phoneNumber: "+61 2 1234 5678",
    country: "Australia",
    carrier: "Telstra",
    type: "VoIP",
    region: "New South Wales",
  },
  {
    id: 4,
    phoneNumber: "+33 1 23 45 67 89",
    country: "France",
    carrier: "Orange",
    type: "Mobile",
    region: "Île-de-France",
  },
  {
    id: 5,
    phoneNumber: "+49 30 1234567",
    country: "Germany",
    carrier: "Deutsche Telekom",
    type: "Landline",
    region: "Berlin",
  },
];

export default function DatabasePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Keep track of the selected file info if needed
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This function is triggered when the file input changes (i.e., a file is selected)
  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file: File | null = null;

    // 1. Get the file from the event
    if (event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
      // Basic validation (optional but recommended)
      if (file.type !== "application/json") {
        setUploadStatus("Error: Please select a JSON file.");
        setSelectedFile(null); // Clear state
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset input
        }
        return;
      }
      setSelectedFile(file); // Update state (optional, as we use the 'file' variable directly)
    } else {
      // Handle the case where no file is selected or the selection is cancelled
      setSelectedFile(null);
      setUploadStatus(""); // Clear status
      return; // Exit if no file selected/cancelled
    }

    // 2. Check if a file was successfully obtained (using the local variable)
    if (!file) {
      setUploadStatus("Error: File selection failed.");
      // Reset input value in case of unexpected issues
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // 3. Proceed with upload immediately after selection
    setIsLoading(true);
    setUploadStatus(`Uploading ${file.name}...`);

    const formData = new FormData();
    // Ensure the field name matches the backend ('file' is default for multer's req.file)
    // The backend middleware (upload.js) uses req.file, which expects the key 'file' by default.
    formData.append("file", file);

    try {
      // Send the file to the backend endpoint
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          // Content-Type is set automatically by the browser for FormData
          // headers: { 'Content-Type': 'multipart/form-data' } // Not usually needed
        }
      );

      // Use backend message if available, otherwise provide a generic success message
      setUploadStatus(
        `Upload successful! ${response.data.message || "Data processed."}`
      );
      console.log("Upload response:", response.data);
      setSelectedFile(null); // Clear state after successful upload
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Upload failed. Please try again.";
      // Extract more specific error message from Axios error response if possible
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = `Upload failed: ${
          error.response.data.error ||
          error.response.data.message ||
          error.message
        }`;
      } else if (error instanceof Error) {
        errorMessage = `Upload failed: ${error.message}`;
      }
      setUploadStatus(errorMessage);
      setSelectedFile(null); // Clear state on error
    } finally {
      setIsLoading(false);
      // Reset the file input value in both success and error cases
      // This allows the user to select the same file again if needed (onChange won't fire otherwise)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would filter the data based on the search query
    console.log("Searching for:", searchQuery);
    // TODO: Implement actual search filtering logic
  };

  // Function to trigger the hidden file input click
  const handleImportButtonClick = () => {
    // Clear previous status messages before opening the dialog
    setUploadStatus("");
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Database Management
      </Typography>

      {/* Display Upload Status */}
      {uploadStatus && (
        <Typography
          color={
            uploadStatus.startsWith("Error:") ||
            uploadStatus.startsWith("Upload failed:")
              ? "error"
              : "textSecondary"
          }
          sx={{ mb: 2 }}
        >
          {uploadStatus}
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Paper sx={{ p: 3, mb: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            {/* Search Box */}
            <Box sx={{ flex: 1 }}>
              <form onSubmit={handleSearch}>
                <TextField
                  fullWidth
                  label="Search phone numbers"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          edge="end"
                          aria-label="search"
                        >
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Box>
            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                gap: 2,
              }}
            >
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                // Call handleFileSelected when a file is chosen
                onChange={handleFileSelected}
                // Accept only JSON files
                accept=".json"
              />
              {/* Import Button */}
              <Button
                variant="contained"
                startIcon={<Upload />}
                color="primary"
                // Trigger the hidden file input when this button is clicked
                onClick={handleImportButtonClick}
                disabled={isLoading} // Disable button during upload
              >
                {selectedFile && isLoading ? "Uploading..." : "Import Data"}
              </Button>
              {/* Export Button (Functionality not implemented) */}
              <Button variant="outlined" startIcon={<Download />}>
                Export Data
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Data Table */}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Carrier</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Replace mockDatabaseEntries with actual data fetched from backend */}
                {mockDatabaseEntries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((entry) => (
                    <TableRow hover key={entry.id}>
                      <TableCell>{entry.phoneNumber}</TableCell>
                      <TableCell>{entry.country}</TableCell>
                      <TableCell>{entry.carrier}</TableCell>
                      <TableCell>{entry.type}</TableCell>
                      <TableCell>{entry.region}</TableCell>
                      <TableCell>
                        {/* TODO: Implement Edit/Delete functionality */}
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="edit"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          aria-label="delete"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            // Replace mockDatabaseEntries.length with actual data count
            count={mockDatabaseEntries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}

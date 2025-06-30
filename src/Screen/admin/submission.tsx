import type React from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TablePagination from "@mui/material/TablePagination"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import { Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material"
import { useState } from "react"

// Mock data
const mockSubmissions = [
  {
    id: 1,
    phoneNumber: "+1 555-123-4567",
    country: "United States",
    carrier: "Verizon",
    type: "Mobile",
    submittedBy: "user@example.com",
    submittedAt: "2023-04-15",
    status: "pending",
  },
  {
    id: 2,
    phoneNumber: "+44 20 1234 5678",
    country: "United Kingdom",
    carrier: "Vodafone",
    type: "Landline",
    submittedBy: "user2@example.com",
    submittedAt: "2023-04-14",
    status: "approved",
  },
  {
    id: 3,
    phoneNumber: "+61 2 1234 5678",
    country: "Australia",
    carrier: "Telstra",
    type: "VoIP",
    submittedBy: "user3@example.com",
    submittedAt: "2023-04-13",
    status: "rejected",
  },
  {
    id: 4,
    phoneNumber: "+33 1 23 45 67 89",
    country: "France",
    carrier: "Orange",
    type: "Mobile",
    submittedBy: "user4@example.com",
    submittedAt: "2023-04-12",
    status: "pending",
  },
  {
    id: 5,
    phoneNumber: "+49 30 1234567",
    country: "Germany",
    carrier: "Deutsche Telekom",
    type: "Landline",
    submittedBy: "user5@example.com",
    submittedAt: "2023-04-11",
    status: "pending",
  },
]

export default function SubmissionsPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Submissions
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Phone Number</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Carrier</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Submitted By</TableCell>
                <TableCell>Submitted At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockSubmissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((submission) => (
                <TableRow hover key={submission.id}>
                  <TableCell>{submission.phoneNumber}</TableCell>
                  <TableCell>{submission.country}</TableCell>
                  <TableCell>{submission.carrier}</TableCell>
                  <TableCell>{submission.type}</TableCell>
                  <TableCell>{submission.submittedBy}</TableCell>
                  <TableCell>{submission.submittedAt}</TableCell>
                  <TableCell>
                    <Chip
                      label={submission.status}
                      color={
                        submission.status === "approved"
                          ? "success"
                          : submission.status === "rejected"
                            ? "error"
                            : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="success" aria-label="approve">
                      <CheckCircle fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" aria-label="reject">
                      <Cancel fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary" aria-label="edit">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" aria-label="delete">
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
          count={mockSubmissions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

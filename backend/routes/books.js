const express = require("express");
const {
  bookExists,
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../db");
const asyncHandler = require("../middleware/asyncHandler");
const { validateBookFields } = require("../middleware/validators");
const buildQuery = require("../utils/buildQuery");

const router = express.Router();

// Helper to preserve form data
const preserveFormData = (req) => ({
  author_first_name: req.body.author_first_name || "",
  author_last_name: req.body.author_last_name || "",
  title: req.body.title || "",
});

// Routes

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await getAllBooks();
    res.render("index", {
      books,
      query: req.query,
      preserved: preserveFormData(req),
    });
  })
);

router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const book = await getBookById(req.params.id);
    if (!book) return res.redirect("/?error=not_found");
    res.render("show", { book });
  })
);

router.post(
  "/books",
  validateBookFields,
  asyncHandler(async (req, res) => {
    const { author_first_name, author_last_name, title } = req.body;

    if (await bookExists(author_first_name, author_last_name, title)) {
      return res.redirect(`/?error=duplicate&${buildQuery(req.body)}`);
    }

    await addBook(author_first_name, author_last_name, title);
    res.redirect("/?success=added");
  })
);

router.get(
  "/books/:id/edit",
  asyncHandler(async (req, res) => {
    const book = await getBookById(req.params.id);
    if (!book) return res.redirect("/?error=not_found");
    res.render("edit", { book });
  })
);

router.put(
  "/books/:id",
  validateBookFields,
  asyncHandler(async (req, res) => {
    const { author_first_name, author_last_name, title } = req.body;
    const rowCount = await updateBook(
      req.params.id,
      author_first_name,
      author_last_name,
      title
    );

    if (rowCount === 0) return res.redirect("/?error=not_found");

    res.redirect("/?success=updated");
  })
);

router.delete(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const rowCount = await deleteBook(req.params.id);
    if (rowCount === 0) return res.redirect("/?error=not_found");
    res.redirect("/?success=deleted");
  })
);

module.exports = router;

# 1.7: Tables

**Difficulty:** Beginner
**Module:** [Module 1: HTML](../README.md)

## What You'll Learn
- The core table tags: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- How to give a table a caption with `<caption>`
- How to merge cells across columns with `colspan` and across rows with `rowspan`
- Why tables should be used for data, not for page layout

## Prerequisites
Topic 1.6: Lists

## Explanation
A table displays data arranged in rows and columns, like a spreadsheet. HTML tables are
built from a small set of tags that always work together.

`<table>` wraps the whole table. Inside it, `<thead>` groups the header row(s) and
`<tbody>` groups the actual data rows; this split has no visual effect by itself, but it
tells the browser (and screen readers) which row is the header. Each row, header or data,
is a `<tr>` (table row). Inside a row, a header cell is a `<th>` (table header) and a
regular data cell is a `<td>` (table data). A `<th>` is normally bold and centered by
default and should carry a `scope` attribute: `scope="col"` when it labels a column,
`scope="row"` when it labels a row, so assistive technology knows what the header
describes.

`<caption>` is placed right after the opening `<table>` tag and gives the table a title,
like "Weekly Class Timetable". It is announced by screen readers before the table content,
so always prefer it over a plain heading sitting next to the table.

Sometimes one cell needs to span more than one column or row. The `colspan` attribute on
a `<td>` or `<th>` makes it stretch across that many columns; `rowspan` makes it stretch
down that many rows. When a cell uses `rowspan`, the rows below it simply have one fewer
`<td>`, because that column is already filled by the spanning cell.

## The Demo
Open `index.html` in a browser. It has two tables:

- A weekly class timetable. Its header row uses `scope="col"`, the time column uses
  `scope="row"`, one row uses `colspan="3"` to show a lecture that spans all three days,
  and another cell uses `rowspan="2"` to show a two-hour lab that covers two time slots.
- A midterm grade sheet, using the same `<thead>`/`<tbody>`/`<th>`/`<td>` structure but
  with no merged cells, so you can compare a simple table to one that uses `colspan` and
  `rowspan`.

`style.css` adds borders, spacing, and a shaded header row so the grid is easy to read;
none of that visual styling is required for the table to work correctly.

## How to Run
Open `index.html` directly in your browser (double-click it, or right-click → Open With).
No installation or server needed.

## Try It Yourself
Add a "Thursday" column to the timetable table. Remember that if you add a column, every
`<tr>` in both `<thead>` and `<tbody>` needs one more cell (except rows using `colspan`,
where you may need to adjust the number).

## Key Takeaways
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` are the building blocks of
  every HTML table.
- `<caption>` gives a table an accessible title.
- `colspan` merges cells across columns; `rowspan` merges cells across rows.
- Tables are for tabular data, not for arranging a whole page's layout.

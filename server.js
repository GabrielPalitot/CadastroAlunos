import app from './app';

const port = 4001;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`Listen in: ${port}`);
});

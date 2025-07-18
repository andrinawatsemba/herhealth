const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const recordRoutes = require('./routes/records');
const reminderRoutes = require('./routes/reminders');
const adviceRoutes = require('./routes/advice');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api', adviceRoutes);

app.get('/', (req, res) => {
  res.send('Her Health Journey Hub API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import 'dotenv/config'
import app from './app'

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server is running at port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
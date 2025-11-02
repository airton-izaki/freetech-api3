const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = autenticar;
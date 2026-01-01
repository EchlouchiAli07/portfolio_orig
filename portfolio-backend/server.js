// ============================================
// BACKEND PORTFOLIO - ALI ECHLOUCHI
// Version simple pour débutant
// ============================================

// 1. IMPORTER LES OUTILS NÉCESSAIRES
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// 2. CRÉER L'APPLICATION EXPRESS
const app = express();

// 3. CONFIGURER L'APPLICATION
app.use(cors()); // Permet au frontend de communiquer
app.use(express.json()); // Comprend le JSON

// 4. CONFIGURER L'ENVOI D'EMAILS
console.log('📧 Configuration email en cours...');
console.log('Email:', process.env.GMAIL_USER);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// 5. VÉRIFIER LA CONNEXION EMAIL
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Erreur de connexion email:', error.message);
  } else {
    console.log('✅ Connexion email réussie!');
  }
});

// 6. PAGE D'ACCUEIL DU SERVEUR
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Backend Portfolio - Ali Echlouchi</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
        }
        
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f1f5f9;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .container {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          padding: 40px;
          max-width: 700px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        
        h1 {
          color: #6366f1;
          font-size: 2.5em;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        
        .status {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: bold;
          margin: 15px 0;
          font-size: 1.1em;
        }
        
        .info-box {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 15px;
          padding: 25px;
          margin: 25px 0;
          text-align: left;
        }
        
        .info-item {
          margin: 10px 0;
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
        }
        
        .endpoints {
          margin-top: 30px;
        }
        
        .endpoint {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 15px;
          margin: 10px 0;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .method {
          background: #6366f1;
          color: white;
          padding: 5px 15px;
          border-radius: 8px;
          font-weight: bold;
          min-width: 80px;
          text-align: center;
        }
        
        .path {
          color: #94a3b8;
          font-family: monospace;
        }
        
        .success {
          color: #10b981;
          font-weight: bold;
        }
        
        .error {
          color: #ef4444;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 <span>Backend Portfolio</span></h1>
        <div class="status">✅ SERVEUR ACTIF</div>
        
        <p>Système de gestion des messages de contact pour le portfolio de</p>
        <h2 style="color: #06b6d4; margin: 15px 0;">Ali Echlouchi</h2>
        <p>Étudiant en Master IS2IA</p>
        
        <div class="info-box">
          <h3 style="color: #06b6d4; margin-bottom: 15px;">📊 Informations système</h3>
          
          <div class="info-item">
            <span>Port:</span>
            <span class="success">3001</span>
          </div>
          
          <div class="info-item">
            <span>Email configuré:</span>
            <span class="${process.env.GMAIL_USER ? 'success' : 'error'}">
              ${process.env.GMAIL_USER ? '✅ Oui' : '❌ Non'}
            </span>
          </div>
          
          <div class="info-item">
            <span>Email de réception:</span>
            <span class="success">${process.env.EMAIL_TO || 'Non configuré'}</span>
          </div>
          
          <div class="info-item">
            <span>Environnement:</span>
            <span class="success">Développement</span>
          </div>
        </div>
        
        <div class="endpoints">
          <h3 style="color: #06b6d4; margin-bottom: 15px;">🔌 Endpoints disponibles</h3>
          
          <div class="endpoint">
            <span class="method">GET</span>
            <span class="path">/</span>
            <span>Page d'accueil (cette page)</span>
          </div>
          
          <div class="endpoint">
            <span class="method">GET</span>
            <span class="path">/test</span>
            <span>Tester l'API</span>
          </div>
          
          <div class="endpoint">
            <span class="method">POST</span>
            <span class="path">/api/contact</span>
            <span>Envoyer un message de contact</span>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <p style="color: #94a3b8; font-size: 0.9em;">
            © 2024 Ali Echlouchi | Backend Portfolio v1.0.0
          </p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// 7. ROUTE DE TEST SIMPLE
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: "🎉 L'API fonctionne parfaitement!",
    server: "Backend Portfolio Ali Echlouchi",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.GMAIL_USER,
    endpoints: {
      home: "GET /",
      test: "GET /test",
      contact: "POST /api/contact"
    }
  });
});

// 8. ROUTE POUR RECEVOIR LES MESSAGES DE CONTACT
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📩 Nouvelle demande de contact reçue...');
    
    // Récupérer les données du formulaire
    const { name, email, subject, message } = req.body;
    
    // Vérifier que tous les champs sont remplis
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: '❌ Tous les champs sont obligatoires.'
      });
    }
    
    console.log(`   👤 De: ${name} <${email}>`);
    console.log(`   📌 Sujet: ${subject}`);
    
    // 1. EMAIL POUR ALI (vous recevez le message)
    const emailToAli = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_TO, // chlouchiali3@gmail.com
      subject: `📧 Nouveau message portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nouveau message de contact</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>👤 Nom:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📌 Sujet:</strong> ${subject}</p>
            <p><strong>📝 Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px; border: 1px solid #e2e8f0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #64748b; font-size: 12px;">
            Message envoyé depuis le portfolio le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
          </p>
        </div>
      `
    };
    
    // 2. EMAIL DE CONFIRMATION POUR LA PERSONNE
    const emailConfirmation = {
      from: `"Ali Echlouchi" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '✅ Confirmation de réception - Ali Echlouchi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Bonjour ${name},</h2>
          <p>J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #bae6fd;">
            <h3 style="color: #0369a1; margin-top: 0;">📋 Récapitulatif de votre message</h3>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Votre message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <h3 style="color: #6366f1;">📞 Mes coordonnées</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0; padding-left: 20px;">📧 <strong>Email:</strong> chlouchiali3@gmail.com</li>
            <li style="margin: 10px 0; padding-left: 20px;">📱 <strong>Téléphone:</strong> +212 6 44 11 45 28</li>
            <li style="margin: 10px 0; padding-left: 20px;">💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/echlouchi-ali/" style="color: #6366f1;">echlouchi-ali</a></li>
            <li style="margin: 10px 0; padding-left: 20px;">🐙 <strong>GitHub:</strong> <a href="https://github.com/EchlouchiAli07" style="color: #6366f1;">EchlouchiAli07</a></li>
          </ul>
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border-radius: 10px;">
            <h3 style="margin-top: 0;">👨‍💻 À propos de moi</h3>
            <p>Je suis Ali Echlouchi, étudiant en Master IS2IA (Ingénierie des Systèmes d'Information et Intelligence Artificielle).</p>
            <p>Passionné par le développement web, l'analyse de données et l'intelligence artificielle.</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px;">
              <em>Ceci est un message automatique de confirmation. Merci de ne pas y répondre.</em><br>
              Date d'envoi: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
            </p>
          </div>
        </div>
      `
    };
    
    // ENVOYER LES EMAILS
    await transporter.sendMail(emailToAli);
    console.log('✅ Email envoyé à Ali');
    
    await transporter.sendMail(emailConfirmation);
    console.log('✅ Email de confirmation envoyé');
    
    // RÉPONSE DE SUCCÈS
    res.json({
      success: true,
      message: '✅ Message envoyé avec succès ! Un email de confirmation vous a été envoyé.',
      data: {
        name,
        email,
        subject,
        sentAt: new Date().toISOString(),
        status: 'delivered'
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Erreur lors de l\'envoi du message. Veuillez réessayer.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 9. DÉMARRER LE SERVEUR
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('============================================');
  console.log('🚀 BACKEND PORTFOLIO - ALI ECHLOUCHI');
  console.log('============================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.GMAIL_USER ? '✅ Configuré' : '❌ Non configuré'}`);
  console.log('============================================');
  console.log('📋 Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/test`);
  console.log(`   POST http://localhost:${PORT}/api/contact`);
  console.log('============================================');
  console.log('⏳ En attente de requêtes...');
  console.log('============================================');
});
// ============================================
// BACKEND PORTFOLIO - ALI ECHLOUCHI
// Version 2.0 - Avec Intelligence Artificielle (NLP)
// ============================================

// 1. IMPORTER LES OUTILS NÉCESSAIRES
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { NlpManager } = require('node-nlp'); // Import NLP
require('dotenv').config();

// 2. CRÉER L'APPLICATION EXPRESS
const app = express();

// 3. CONFIGURER L'APPLICATION
app.use(cors()); // Permet au frontend de communiquer
app.use(express.json()); // Comprend le JSON

// ============================================
// 4. CONFIGURER L'INTELLIGENCE ARTIFICIELLE (NLP)
// ============================================
console.log('🤖 Initialisation de l\'IA...');
const manager = new NlpManager({ languages: ['fr'], forceNER: true });

// Fonction pour entraîner l'IA
async function trainAI() {
  console.log('🧠 Entraînement du modèle IA en cours...');

  // --- INTENTS (Ce que l'utilisateur veut dire) ---

  // Salutations
  manager.addDocument('fr', 'bonjour', 'greetings.hello');
  manager.addDocument('fr', 'salut', 'greetings.hello');
  manager.addDocument('fr', 'hello', 'greetings.hello');
  manager.addDocument('fr', 'bonsoir', 'greetings.hello');

  manager.addDocument('fr', 'au revoir', 'greetings.bye');

  // Compétences
  manager.addDocument('fr', 'quelles sont tes compétences', 'skills.list');
  manager.addDocument('fr', 'que sais tu faire', 'skills.list');
  manager.addDocument('fr', 'tes technos', 'skills.list');
  manager.addDocument('fr', 'maitrise', 'skills.list');
  manager.addDocument('fr', 'programmation', 'skills.prog');
  manager.addDocument('fr', 'logiciel', 'skills.prog');
  manager.addDocument('fr', 'web', 'skills.web');
  manager.addDocument('fr', 'data science', 'skills.data');
  manager.addDocument('fr', 'intelligence artificielle', 'skills.data');
  manager.addDocument('fr', 'big data', 'skills.bigdata');
  manager.addDocument('fr', 'bases de données', 'skills.db');
  manager.addDocument('fr', 'bi', 'skills.bi');
  manager.addDocument('fr', 'business intelligence', 'skills.bi');
  manager.addDocument('fr', 'soft skills', 'skills.soft');
  manager.addDocument('fr', 'méthodes', 'skills.methods');
  manager.addDocument('fr', 'outils', 'skills.tools');

  // Projets Académiques
  manager.addDocument('fr', 'projets académiques', 'projects.acad');
  manager.addDocument('fr', 'quels sont tes projets', 'projects.acad');
  manager.addDocument('fr', 'chatbot éducatif', 'projects.edu');
  manager.addDocument('fr', 'apprentissage', 'projects.edu');
  manager.addDocument('fr', 'satisfaction transport', 'projects.transport');
  manager.addDocument('fr', 'acm', 'projects.transport');
  manager.addDocument('fr', 'bancaire sécurisé', 'projects.bank');
  manager.addDocument('fr', '2fa', 'projects.bank');
  manager.addDocument('fr', 'virtual mall 3d', 'projects.3d');
  manager.addDocument('fr', 'three.js', 'projects.3d');

  // Expérience Professionnelle
  manager.addDocument('fr', 'expérience professionnelle', 'exp.list');
  manager.addDocument('fr', 'travail', 'exp.list');
  manager.addDocument('fr', 'clinique intelligente', 'exp.clinique');
  manager.addDocument('fr', 'chatbot médical', 'exp.clinique');

  // Certifications
  manager.addDocument('fr', 'certifications', 'certs.list');
  manager.addDocument('fr', 'diplômes', 'certs.list');
  manager.addDocument('fr', 'linux', 'certs.linux');
  manager.addDocument('fr', 'ethical hacker', 'certs.hacker');
  manager.addDocument('fr', 'iot', 'certs.iot');
  manager.addDocument('fr', 'cpp', 'certs.cpp');
  manager.addDocument('fr', 'ibm python', 'certs.ibm');
  manager.addDocument('fr', 'azure cv', 'certs.azure');
  manager.addDocument('fr', 'microsoft', 'certs.azure');

  // Education
  manager.addDocument('fr', 'formation', 'edu.list');
  manager.addDocument('fr', 'études', 'edu.list');
  manager.addDocument('fr', 'master', 'edu.master');
  manager.addDocument('fr', 'is2ia', 'edu.master');
  manager.addDocument('fr', 'licence', 'edu.licence');
  manager.addDocument('fr', 'bac', 'edu.bac');

  // Contact
  manager.addDocument('fr', 'comment te contacter', 'contact.info');
  manager.addDocument('fr', 'email', 'contact.email');
  manager.addDocument('fr', 'téléphone', 'contact.phone');
  manager.addDocument('fr', 'linkedin', 'contact.linkedin');
  manager.addDocument('fr', 'voir ton linkedin', 'contact.linkedin');
  manager.addDocument('fr', 'profil professionnel', 'contact.linkedin');
  manager.addDocument('fr', 'réseau social', 'contact.linkedin');
  manager.addDocument('fr', 'github', 'contact.github');
  manager.addDocument('fr', 'localisation', 'contact.loc');
  manager.addDocument('fr', 'ville', 'contact.loc');

  // Langues
  manager.addDocument('fr', 'langues', 'lang.list');
  manager.addDocument('fr', 'tu parles quoi', 'lang.list');

  // CV
  manager.addDocument('fr', 'ton cv', 'cv.download');
  manager.addDocument('fr', 'télécharger cv', 'cv.download');

  // Identité
  manager.addDocument('fr', 'qui es tu', 'agent.whoami');
  manager.addDocument('fr', 'présente toi', 'agent.whoami');

  // --- ANSWERS (100% Accuracy) ---

  // Salutations
  manager.addAnswer('fr', 'greetings.hello', "Bonjour ! Je suis l'assistant d'Ali Echlouchi. Je connais tout son parcours par cœur. Comment puis-je vous aider ? 😊");
  manager.addAnswer('fr', 'greetings.bye', "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions sur Ali. 👋");

  // Compétences
  manager.addAnswer('fr', 'skills.list', "Ali possède une expertise variée : <br>• **Data Science & IA** (90%)<br>• **Développement Web** (88%)<br>• **Bases de Données** (85%)<br>• **Programmation** (83%)<br>• **Business Intelligence** (78%)<br>• **Big Data** (72%).");
  manager.addAnswer('fr', 'skills.prog', "En programmation (83%), Ali maîtrise **Java, Python, C/C++ et JavaScript**. Il est particulièrement à l'aise avec la logique logicielle.");
  manager.addAnswer('fr', 'skills.web', "En Web (88%), il utilise la **MERN Stack** (MongoDB, Express, React, Node.js), Next.js, NestJS, PHP et Flask.");
  manager.addAnswer('fr', 'skills.data', "En Data/IA (90%), Ali est expert en **Machine Learning, Deep Learning et NLP**. Il utilise Python (Pandas, Scikit-learn, TensorFlow) et R.");
  manager.addAnswer('fr', 'skills.bigdata', "En Big Data (72%), il travaille avec **Spark et Hadoop** pour le traitement de données à grande échelle.");
  manager.addAnswer('fr', 'skills.db', "Il gère les bases de données (85%) avec **PostgreSQL, MySQL et MongoDB** (Prisma ORM).");
  manager.addAnswer('fr', 'skills.bi', "En BI (78%), il utilise **Power BI** pour la visualisation et l'aide à la décision.");
  manager.addAnswer('fr', 'skills.soft', "Ses soft skills incluent le **travail d'équipe, la résolution de problèmes, la communication et l'autonomie**.");
  manager.addAnswer('fr', 'skills.methods', "Il applique les méthodologies **Agile Scrum, UML, Merise et DevOps (CI/CD)**.");
  manager.addAnswer('fr', 'skills.tools', "Ses outils quotidiens sont **Git, GitHub, Docker, VS Code, Linux et LaTeX**.");

  // Projets Académiques
  manager.addAnswer('fr', 'projects.acad', "Ali a 4 projets académiques majeurs : <br>1. **Chatbot Éducatif** (MERN)<br>2. **Étude Transport** (ACM/Data)<br>3. **Système Bancaire** (Sécurité)<br>4. **Virtual Mall 3D** (Three.js).");
  manager.addAnswer('fr', 'projects.edu', "Le **Chatbot Éducatif** est intégré à une plateforme d'apprentissage (2024-2025). Il utilise la MERN Stack et OpenRouter pour assister les apprenants.");
  manager.addAnswer('fr', 'projects.transport', "L'**Étude de Satisfaction Transport** (2024-2025) utilise l'ACM avec Python et R pour analyser les données collectées via Google Forms.");
  manager.addAnswer('fr', 'projects.bank', "Le **Système Bancaire Sécurisé** (2024-2025) est basé sur Flask/Python avec authentification 2FA et protection RBAC.");
  manager.addAnswer('fr', 'projects.3d', "Le **Virtual Mall 3D** (2024-2025) offre une navigation immersive via Three.js, WebGL et une modélisation sous Blender.");

  // Expérience Professionnelle
  manager.addAnswer('fr', 'exp.list', "L'expérience clé d'Ali est son rôle de **Développeur Full Stack & IA** sur le projet **Clinique Intelligente** (2024-2025).");
  manager.addAnswer('fr', 'exp.clinique', "Sur le projet **Clinique Intelligente**, Ali a développé un chatbot médical IA (OpenRouter), la gestion des ordonnances (PDF/QR) et une messagerie temps réel avec Next.js et NestJS.");

  // Certifications
  manager.addAnswer('fr', 'certs.list', "Ali possède 6 certifications Cisco, IBM et Microsoft : Linux Essentials, Ethical Hacker, IoT, C++, Data Analysis (Python) et Computer Vision (Azure).");
  manager.addAnswer('fr', 'certs.linux', "Certification **NDG Linux Essentials** délivrée par Cisco Networking Academy.");
  manager.addAnswer('fr', 'certs.hacker', "Certification **Ethical Hacker** délivrée par Cisco Networking Academy.");
  manager.addAnswer('fr', 'certs.iot', "Certification **Introduction à l'IoT** délivrée par Cisco Networking Academy.");
  manager.addAnswer('fr', 'certs.cpp', "Certification **C++ Essentials I** délivrée par Cisco Networking Academy.");
  manager.addAnswer('fr', 'certs.ibm', "Certification **Data Analysis with Python** délivrée par IBM.");
  manager.addAnswer('fr', 'certs.azure', "Certification **Computer Vision with Azure** délivrée par Microsoft.");

  // Education
  manager.addAnswer('fr', 'edu.list', "Formation d'Ali : <br>• **Master IS2IA** (En cours, 2025-2026)<br>• **Licence Ingénierie Logicielle** (2022-2025)<br>• **Bac PC** (2021-2022).");
  manager.addAnswer('fr', 'edu.master', "Ali est en **Master IS2IA** (Ingénierie des Systèmes d'Information et IA) à l'ESISA, Fès (2025-2026).");
  manager.addAnswer('fr', 'edu.licence', "Il est diplômé d'une **Licence en Ingénierie Logicielle** (2022-2025) de l'ESISA, Fès.");
  manager.addAnswer('fr', 'edu.bac', "Il a obtenu son **Baccalauréat Sciences PC** (Section Française) en 2022 à La Résidence 2, Fès.");

  // Contact
  manager.addAnswer('fr', 'contact.info', "Contactez Ali au **+212 6 44 11 45 28** ou par email à **chlouchiali3@gmail.com**.");
  manager.addAnswer('fr', 'contact.email', "Son email est : **chlouchiali3@gmail.com** 📧");
  manager.addAnswer('fr', 'contact.phone', "Son numéro de téléphone : **+212 6 44 11 45 28** 📱");
  manager.addAnswer('fr', 'contact.linkedin', "Retrouvez le profil professionnel d'Ali sur LinkedIn pour plus de détails sur son parcours et ses recommandations : <a href='https://linkedin.com/in/echlouchi-ali/' target='_blank' style='color:#00e5ff; text-decoration: underline;'>🔗 Ali Echlouchi</a>");
  manager.addAnswer('fr', 'contact.github', "Lien GitHub : <a href='https://github.com/EchlouchiAli07' target='_blank'>EchlouchiAli07</a>");
  manager.addAnswer('fr', 'contact.loc', "Ali est basé à **Fès, Maroc**.");

  // Langues
  manager.addAnswer('fr', 'lang.list', "Ali parle couramment l'**Arabe** (maternel), le **Français** (TCF B2) et l'**Anglais** (B1/B2).");

  // CV
  manager.addAnswer('fr', 'cv.download', "Téléchargez son CV complet ici : <a href='cv/CV_Echlouchi_Ali.pdf' target='_blank' style='color:#00e5ff; text-decoration:underline;'>📄 Voir le CV PDF</a>");

  // Identité
  manager.addAnswer('fr', 'agent.whoami', "Je suis l'assistant personnel d'Ali Echlouchi, futur ingénieur expert en Intelligence Artificielle.");
  manager.addAnswer('fr', 'agent.bot', "Oui, je suis une IA basée sur le traitement du langage naturel ! 🤖");

  await manager.train();
  manager.save();
  console.log('✅ Modèle IA ré-entraîné avec succès !');
}

// Lancer l'entraînement au démarrage
trainAI();


// ============================================
// 5. CONFIGURER L'ENVOI D'EMAILS (Nodemailer)
// ============================================
console.log('📧 Configuration email en cours...');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


// ============================================
// 6. ROUTES API
// ============================================

// A. Chatbot AI Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message requis" });

    // Traitement du message par l'IA
    const result = await manager.process('fr', message);

    // Si l'IA a une réponse, on l'envoie. Sinon, réponse par défaut.
    const answer = result.answer || "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ? (Je peux parler des compétences, projets, ou contact)";

    // Log pour débug
    console.log(`🗣️ User: ${message} | 🤖 Bot: ${answer} (Intent: ${result.intent})`);

    res.json({
      answer: answer,
      intent: result.intent,
      score: result.score
    });

  } catch (error) {
    console.error('Erreur Chatbot:', error);
    res.status(500).json({ error: "Erreur interne du chatbot" });
  }
});


// B. Route Contact (Email)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires.' });
    }

    const emailToAli = {
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📧 Contact: ${subject}`,
      text: `De: ${name} (${email})\n\n${message}`
    };

    await transporter.sendMail(emailToAli);
    res.json({ success: true, message: 'Message envoyé !' });

  } catch (error) {
    console.error('Erreur Email:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi.' });
  }
});

// C. Route Test
app.get('/', (req, res) => {
  res.send('<h1>🤖 Backend Portfolio AI - En ligne</h1><p>Endpoint Chatbot: POST /api/chat</p>');
});


// ============================================
// 7. DÉMARRER LE SERVEUR
// ============================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
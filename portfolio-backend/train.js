const { NlpManager } = require('node-nlp');
const fs = require('fs');

async function trainModel() {
    console.log('🤖 Initialisation de l\'IA pour l\'entraînement...');
    const manager = new NlpManager({ languages: ['fr'], forceNER: true });

    // --- INTENTS (Français) ---

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
    manager.addDocument('fr', 'log logiciels', 'skills.prog');
    manager.addDocument('fr', 'web', 'skills.web');
    manager.addDocument('fr', 'fullstack', 'skills.web');
    manager.addDocument('fr', 'data science', 'skills.data');
    manager.addDocument('fr', 'intelligence artificielle', 'skills.data');
    manager.addDocument('fr', 'machine learning', 'skills.data');
    manager.addDocument('fr', 'deep learning', 'skills.data');
    manager.addDocument('fr', 'nlp', 'skills.data');
    manager.addDocument('fr', 'big data', 'skills.bigdata');
    manager.addDocument('fr', 'spark', 'skills.bigdata');
    manager.addDocument('fr', 'hadoop', 'skills.bigdata');
    manager.addDocument('fr', 'bases de données', 'skills.db');
    manager.addDocument('fr', 'sql', 'skills.db');
    manager.addDocument('fr', 'nosql', 'skills.db');
    manager.addDocument('fr', 'bi', 'skills.bi');
    manager.addDocument('fr', 'business intelligence', 'skills.bi');
    manager.addDocument('fr', 'power bi', 'skills.bi');
    manager.addDocument('fr', 'soft skills', 'skills.soft');
    manager.addDocument('fr', 'qualités', 'skills.soft');
    manager.addDocument('fr', 'méthodes', 'skills.methods');
    manager.addDocument('fr', 'agile', 'skills.methods');
    manager.addDocument('fr', 'outils', 'skills.tools');
    manager.addDocument('fr', 'docker', 'skills.tools');
    manager.addDocument('fr', 'git', 'skills.tools');

    // Projets Académiques
    manager.addDocument('fr', 'projets académiques', 'projects.acad');
    manager.addDocument('fr', 'quels sont tes projets', 'projects.acad');
    manager.addDocument('fr', 'réalisations', 'projects.acad');
    manager.addDocument('fr', 'chatbot éducatif', 'projects.edu');
    manager.addDocument('fr', 'apprentissage', 'projects.edu');
    manager.addDocument('fr', 'satisfaction transport', 'projects.transport');
    manager.addDocument('fr', 'acm', 'projects.transport');
    manager.addDocument('fr', 'bancaire sécurisé', 'projects.bank');
    manager.addDocument('fr', 'sécurité', 'projects.bank');
    manager.addDocument('fr', 'virtual mall 3d', 'projects.3d');
    manager.addDocument('fr', 'three.js', 'projects.3d');
    manager.addDocument('fr', 'energyai', 'projects.energyai');
    manager.addDocument('fr', 'gestion demandes', 'projects.energyai');
    manager.addDocument('fr', 'smart city', 'projects.smartcity');
    manager.addDocument('fr', 'iot', 'projects.smartcity');

    // Expérience Professionnelle
    manager.addDocument('fr', 'expérience professionnelle', 'exp.list');
    manager.addDocument('fr', 'travail', 'exp.list');
    manager.addDocument('fr', 'stage', 'exp.list');
    manager.addDocument('fr', 'clinique intelligente', 'exp.clinique');
    manager.addDocument('fr', 'chatbot médical', 'exp.clinique');
    manager.addDocument('fr', 'newdev agency', 'exp.clinique');

    // Certifications
    manager.addDocument('fr', 'certifications', 'certs.list');
    manager.addDocument('fr', 'diplômes certifs', 'certs.list');
    manager.addDocument('fr', 'linux', 'certs.linux');
    manager.addDocument('fr', 'ethical hacker', 'certs.hacker');
    manager.addDocument('fr', 'iot certif', 'certs.iot');
    manager.addDocument('fr', 'cpp certif', 'certs.cpp');
    manager.addDocument('fr', 'ibm python', 'certs.ibm');
    manager.addDocument('fr', 'azure cv', 'certs.azure');
    manager.addDocument('fr', 'microsoft ai', 'certs.azure');

    // Education
    manager.addDocument('fr', 'formation', 'edu.list');
    manager.addDocument('fr', 'études', 'edu.list');
    manager.addDocument('fr', 'parcours scolaire', 'edu.list');
    manager.addDocument('fr', 'master', 'edu.master');
    manager.addDocument('fr', 'is2ia', 'edu.master');
    manager.addDocument('fr', 'licence', 'edu.licence');
    manager.addDocument('fr', 'bac', 'edu.bac');

    // Contact
    manager.addDocument('fr', 'comment te contacter', 'contact.info');
    manager.addDocument('fr', 'email', 'contact.email');
    manager.addDocument('fr', 'téléphone', 'contact.phone');
    manager.addDocument('fr', 'linkedin', 'contact.linkedin');
    manager.addDocument('fr', 'github', 'contact.github');
    manager.addDocument('fr', 'localisation', 'contact.loc');
    manager.addDocument('fr', 'ville', 'contact.loc');

    // Langues
    manager.addDocument('fr', 'langues', 'lang.list');
    manager.addDocument('fr', 'tu parles quoi', 'lang.list');

    // CV
    manager.addDocument('fr', 'ton cv', 'cv.download');
    manager.addDocument('fr', 'télécharger cv', 'cv.download');
    manager.addDocument('fr', 'curriculum vitae', 'cv.download');

    // Identité
    manager.addDocument('fr', 'qui es tu', 'agent.whoami');
    manager.addDocument('fr', 'présente toi', 'agent.whoami');
    manager.addDocument('fr', 'c est quoi ton nom', 'agent.whoami');

    // Hobbies
    manager.addDocument('fr', 'passions', 'hobbies.list');
    manager.addDocument('fr', 'hobbies', 'hobbies.list');
    manager.addDocument('fr', 'que fais tu de ton temps libre', 'hobbies.list');
    manager.addDocument('fr', 'loisirs', 'hobbies.list');

    // --- ANSWERS ---

    // Salutations
    manager.addAnswer('fr', 'greetings.hello', "Bonjour ! Je suis l'assistant d'Ali Echlouchi. Je connais tout son parcours par cœur. Comment puis-je vous aider ? 😊");
    manager.addAnswer('fr', 'greetings.bye', "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions sur Ali. 👋");

    // Compétences
    manager.addAnswer('fr', 'skills.list', "Ali possède une expertise variée : <br>• **IA & Data Science** (90%) : ML, Deep Learning, NLP.<br>• **Développement Web** (88%) : MERN Stack, Next.js, NestJS.<br>• **Bases de Données** (85%) : PostgreSQL, MongoDB, MySQL.<br>• **Programmation** (83%) : Java, Python, C++, JS.<br>• **Big Data & BI** : Spark, Hadoop, Power BI.");
    manager.addAnswer('fr', 'skills.prog', "En programmation (83%), Ali maîtrise **Java, Python, C/C++ et JavaScript**. Il est particulièrement expert en logique logicielle.");
    manager.addAnswer('fr', 'skills.web', "En Web (88%), il utilise la **MERN Stack** (MongoDB, Express, React, Node.js), Next.js, NestJS, PHP et Flask.");
    manager.addAnswer('fr', 'skills.data', "En Data/IA (90%), Ali est expert en **Machine Learning, Deep Learning et NLP**. Il utilise Python (Pandas, Scikit-learn, TensorFlow) et R.");
    manager.addAnswer('fr', 'skills.bigdata', "En Big Data (72%), il travaille avec **Spark et Hadoop** pour le traitement de données à grande échelle.");
    manager.addAnswer('fr', 'skills.db', "Il gère les bases de données (85%) avec **PostgreSQL, MySQL et MongoDB** (Prisma ORM).");
    manager.addAnswer('fr', 'skills.bi', "En BI (78%), il utilise **Power BI** pour la visualisation et l'aide à la décision.");
    manager.addAnswer('fr', 'skills.soft', "Ses soft skills incluent le **travail d'équipe, la résolution de problèmes, la communication et l'autonomie**.");
    manager.addAnswer('fr', 'skills.methods', "Il applique les méthodologies **Agile Scrum, UML, Merise et DevOps (CI/CD)**.");
    manager.addAnswer('fr', 'skills.tools', "Ses outils quotidiens sont **Git, GitHub, Docker, VS Code, Linux et LaTeX**.");

    // Projets Académiques
    manager.addAnswer('fr', 'projects.acad', "Ali a réalisé 6 projets majeurs : <br>1. **EnergyAI** (SaaS IA)<br>2. **Smart City IoT**<br>3. **Chatbot Éducatif** (MERN)<br>4. **Étude Transport** (ACM)<br>5. **Système Bancaire** (Sécurité)<br>6. **Virtual Mall 3D** (Three.js).");
    manager.addAnswer('fr', 'projects.edu', "Le **Chatbot Éducatif** est une plateforme interactive (2024-2025) utilisant la MERN Stack et OpenRouter pour assister les apprenants avec des parcours personnalisés.");
    manager.addAnswer('fr', 'projects.transport', "L'**Étude de Satisfaction Transport** (2024-2025) utilise l'Analyse des Correspondances Multiples (ACM) avec Python et R.");
    manager.addAnswer('fr', 'projects.bank', "Le **Système Bancaire Sécurisé** (2024-2025) est basé sur Flask avec authentification 2FA et protection RBAC.");
    manager.addAnswer('fr', 'projects.3d', "Le **Virtual Mall 3D** (2024-2025) offre une navigation immersive via Three.js, WebGL et modélisation Blender.");
    manager.addAnswer('fr', 'projects.energyai', "Le projet **EnergyAI** est une solution SaaS pour fournisseurs d'énergie automatisant le traitement des demandes via une IA hybride (NLP + RF).");
    manager.addAnswer('fr', 'projects.smartcity', "La plateforme **Smart City IoT** permet une surveillance en temps réel via microservices, MQTT et un dashboard React.");

    // Expérience Professionnelle
    manager.addAnswer('fr', 'exp.list', "Ali a effectué un stage chez **NEWDEV Agency** (Mai - Juillet 2025) en tant que **Développeur Full Stack & IA**.");
    manager.addAnswer('fr', 'exp.clinique', "Pour **NEWDEV Agency**, Ali a conçu une **Clinique Intelligente** avec un chatbot médical (OpenRouter), gestion d'ordonnordonnances (PDF/QR) et messagerie temps réel.");

    // Certifications
    manager.addAnswer('fr', 'certs.list', "Ali possède 6 certifications majeures : **Linux Essentials**, **Ethical Hacker**, **IoT**, **C++ Essentials** (Cisco), **Data Analysis** (IBM) et **Computer Vision** (Microsoft Azure).");
    manager.addAnswer('fr', 'certs.linux', "Certification **NDG Linux Essentials** (Cisco Networking Academy).");
    manager.addAnswer('fr', 'certs.hacker', "Certification **Ethical Hacker** (Cisco Networking Academy).");
    manager.addAnswer('fr', 'certs.iot', "Certification **Introduction à l'IoT** (Cisco Networking Academy).");
    manager.addAnswer('fr', 'certs.cpp', "Certification **C++ Essentials I** (Cisco Networking Academy).");
    manager.addAnswer('fr', 'certs.ibm', "Certification **Data Analysis with Python** (IBM).");
    manager.addAnswer('fr', 'certs.azure', "Certification **Computer Vision with Azure** (Microsoft).");

    // Education
    manager.addAnswer('fr', 'edu.list', "Formation d'Ali : <br>• **Master IS2IA** (En cours, 2025-2026)<br>• **Licence Ingénierie Logicielle** (Diplômé, 2022-2025)<br>• **Bac PC** (2022).");
    manager.addAnswer('fr', 'edu.master', "Ali est actuellement en **Master IS2IA** (Ingénierie des Systèmes d'Information et IA) à l'ESISA, Fès.");
    manager.addAnswer('fr', 'edu.licence', "Il est diplômé d'une **Licence en Ingénierie Logicielle** de l'ESISA, Fès.");
    manager.addAnswer('fr', 'edu.bac', "Il a obtenu son **Baccalauréat Sciences PC** (Section Française) en 2022.");

    // Contact
    manager.addAnswer('fr', 'contact.info', "Vous pouvez contacter Ali par email à **echlouchiali@gmail.com** ou par téléphone au **+212 6 44 11 45 28**.");
    manager.addAnswer('fr', 'contact.email', "Son email est : **echlouchiali@gmail.com** 📧");
    manager.addAnswer('fr', 'contact.phone', "Son numéro de téléphone : **+212 6 44 11 45 28** 📱");
    manager.addAnswer('fr', 'contact.linkedin', "Profil LinkedIn : <a href='https://linkedin.com/in/echlouchi-ali/' target='_blank' style='color:#00e5ff;'>🔗 Ali Echlouchi</a>");
    manager.addAnswer('fr', 'contact.github', "Lien GitHub : <a href='https://github.com/EchlouchiAli07' target='_blank'>EchlouchiAli07</a>");
    manager.addAnswer('fr', 'contact.loc', "Ali est basé à **Fès, Maroc**.");

    // Langues
    manager.addAnswer('fr', 'lang.list', "Ali parle couramment l'**Arabe** (maternel), le **Français** (TCF B2) et l'**Anglais** (B1/B2).");

    // CV
    manager.addAnswer('fr', 'cv.download', "Téléchargez son CV complet ici : <a href='cv/CV_Echlouchi_Ali.pdf' target='_blank' style='color:#00e5ff; text-decoration:underline;'>📄 Voir le CV PDF</a>");

    // Identité
    manager.addAnswer('fr', 'agent.whoami', "Je suis l'assistant personnel d'Ali Echlouchi, futur ingénieur en Intelligence Artificielle et Développement Full-Stack.");

    // Hobbies
    manager.addAnswer('fr', 'hobbies.list', "En dehors du code, Ali est passionné par le **Volleyball**, le **Dessin** et la **Lecture**.");

    // EXPORT
    console.log('🧠 Entraînement en cours...');
    await manager.train();
    manager.save('model.nlp');
    console.log('✅ Modèle IA entraîné et sauvegardé sous model.nlp !');
}

trainModel();

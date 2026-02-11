# 🚀 Portfolio Ali Echlouchi

Portfolio moderne et intelligent d'Ali Echlouchi, étudiant en Master IS2IA (Ingénierie des Systèmes d'Information et Intelligence Artificielle).

## ✨ Fonctionnalités

- 🎨 **Design Premium** : Interface moderne avec dark/light mode
- 🌊 **Animations Fluides** : Particules interactives, fade-in au scroll, typing effect
- 📱 **Responsive** : Optimisé pour mobile, tablette et desktop
- 🎯 **SEO Optimisé** : Meta tags, Open Graph, structure sémantique
- 📧 **Formulaire de Contact** : Intégration Formspree (sans backend)
- ⚡ **Performance** : Chargement rapide, animations optimisées
- 🎭 **Thème Toggle** : Basculer entre mode sombre et clair

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design system moderne avec variables CSS
- **JavaScript** : Vanilla JS (Intersection Observer, Fetch API)
- **Particles.js** : Fond animé interactif
- **Font Awesome** : Icônes
- **Google Fonts** : Typographie Inter

## 📂 Structure du Projet

```
portfolio/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # JavaScript
├── img/                # Images
│   └── IMG_1461-removebg-preview.png
├── certif/             # Certificats PDF
│   ├── cert.pdf
│   ├── EthicalHackerUpdate20251125-30-rbkb2s_compressed.pdf
│   ├── IntrotoIoTUpdate20251125-30-maxncn.pdf
│   ├── CEssentials1Update20251125-30-ily8w2_compressed.pdf
│   ├── ibm (1).pdf
│   └── Coursera 5JSCO8KR0XC3 (1).pdf
├── cv/                 # CV PDF
│   └── CV Echlouchi Ali .pdf
└── README.md           # Ce fichier
```

## 🚀 Déploiement

### Option 1 : GitHub Pages (Recommandé)

1. **Créer un dépôt GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - Aller dans `Settings` > `Pages`
   - Source : `Deploy from a branch`
   - Branch : `main` / `root`
   - Cliquer sur `Save`
   - Votre site sera disponible sur : `https://VOTRE_USERNAME.github.io/portfolio/`

### Option 2 : Netlify (Le plus simple)

1. **Déploiement par glisser-déposer**
   - Aller sur [netlify.com/drop](https://app.netlify.com/drop)
   - Glisser-déposer le dossier `portfolio/`
   - Votre site est en ligne instantanément !

2. **Déploiement via GitHub**
   - Connecter votre dépôt GitHub
   - Netlify déploiera automatiquement à chaque push

### Option 3 : Vercel

1. **Installation**
   ```bash
   npm install -g vercel
   ```

2. **Déploiement**
   ```bash
   cd portfolio
   vercel
   ```

## ⚙️ Configuration du Formulaire de Contact

Le formulaire utilise [Formspree](https://formspree.io) (gratuit, 50 soumissions/mois).

1. **Créer un compte Formspree**
   - Aller sur [formspree.io](https://formspree.io)
   - Créer un compte gratuit
   - Créer un nouveau formulaire

2. **Configurer le formulaire**
   - Copier votre Form ID (ex: `xyzabc123`)
   - Ouvrir `script.js`
   - Ligne 198, remplacer `YOUR_FORM_ID` par votre ID :
     ```javascript
     const FORMSPREE_ID = 'xyzabc123'; // ⚠️ Remplacer par votre ID
     ```

3. **Tester**
   - Ouvrir votre portfolio
   - Remplir le formulaire de contact
   - Vous recevrez un email de confirmation

## 🎨 Personnalisation

### Changer les Couleurs

Modifier les variables CSS dans `style.css` (lignes 9-18) :

```css
:root {
    --primary: #6366f1;      /* Couleur principale */
    --secondary: #10b981;    /* Couleur secondaire */
    --accent: #06b6d4;       /* Couleur d'accent */
    /* ... */
}
```

### Modifier le Contenu

Éditer `index.html` pour changer :
- Nom, titre, description
- Projets
- Expérience
- Certifications
- Compétences

## 📱 Responsive Breakpoints

- **Desktop** : > 992px
- **Tablette** : 768px - 992px
- **Mobile** : < 768px
- **Petit Mobile** : < 480px

## 🌐 Navigateurs Supportés

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser comme template pour votre propre portfolio.

## 👨‍💻 Auteur

**Ali Echlouchi**
- 📧 Email: chlouchiali3@gmail.com
- 💼 LinkedIn: [echlouchi-ali](https://linkedin.com/in/echlouchi-ali/)
- 🐙 GitHub: [EchlouchiAli07](https://github.com/EchlouchiAli07)

---

Made with ❤️ by Ali Echlouchi

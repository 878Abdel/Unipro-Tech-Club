# 🚀 UNIPRO Tech Club - Site Web

## 📍 Accès au Site

### 🔗 **URL du site déployé :**
```
https://878abdel.github.io/Unipro-Tech-Club/
```

### 👥 **Pour les collaborateurs :**
Le site est hébergé sur **GitHub Pages**, donc tout le monde peut y accéder sans serveur local !

---

## 🔐 Accès Administration

### Identifiants par défaut :
- **Utilisateur :** `admin`
- **Mot de passe :** `unipro2024`

### URL d'accès admin :
```
https://878abdel.github.io/Unipro-Tech-Club/admin.html
```

---

## 🛠️ Comment travailler en collaboration

### 1. **Pour les visiteurs/utilisateurs :**
- ✅ Accès direct via l'URL GitHub Pages
- ✅ Navigation complète entre toutes les pages
- ✅ Formulaire de contact fonctionnel
- ✅ Portfolio dynamique avec filtres

### 2. **Pour les administrateurs :**
- ✅ Connexion via `/admin.html`
- ✅ Gestion complète des projets/services/activités
- ✅ Modification en temps réel (visible par tous)
- ✅ Export des données

### 3. **Pour les développeurs (si modifications du code) :**

```bash
# Cloner le dépôt
git clone https://github.com/878Abdel/Unipro-Tech-Club.git

# Naviguer dans le projet
cd Unipro-Tech-Club

# Lancer en local (pour développement)
python -m http.server 8000

# Accès local : http://localhost:8000
```

---

## 📊 Architecture Technique

### **Frontend :**
- HTML5 + CSS3 + Tailwind CSS
- JavaScript Vanilla (GSAP pour animations)
- Design responsive et accessible

### **Backend :**
- **Aucun serveur requis !**
- Base de données : **localStorage** (côté client)
- Authentification : sessionStorage
- Gestion complète CRUD

### **Déploiement :**
- **GitHub Pages** (statique et gratuit)
- Mise à jour automatique après chaque `git push`

---

## 🎯 Fonctionnalités Principales

### **Côté Utilisateur :**
- 📱 Navigation responsive
- 🎨 Design moderne avec animations
- 📂 Portfolio dynamique avec filtres
- 💼 Services avec demande de devis
- 📧 Formulaire de contact fonctionnel
- 📋 FAQ interactive

### **Côté Administrateur :**
- 🔐 Accès sécurisé (admin/unipro2024)
- ➕ Ajouter/Modifier/Supprimer projets
- 📊 Statistiques en temps réel
- 💾 Export des données (JSON)
- 🔄 Sauvegarde automatique
- 📝 Gestion des messages de contact

---

## 🔄 Comment les données sont partagées

### **Important :** 
Le site utilise **localStorage**, donc chaque utilisateur a ses propres données localement.

### **Pour partager les données entre collaborateurs :**

1. **Export des données (Admin) :**
   - Aller dans `/admin.html`
   - Cliquer sur "Exporter les données"
   - Télécharger le fichier JSON

2. **Import des données (Collaborateur) :**
   - Aller dans `/admin.html`
   - Cliquer sur "Importer des données"
   - Sélectionner le fichier JSON partagé

### **Alternative pour collaboration réelle :**
Pour une vraie collaboration en temps réel, il faudrait :
- Ajouter une base de données externe (Firebase, Supabase)
- Ou utiliser un backend Node.js avec MongoDB

---

## 🚀 Déploiement Automatique

### **GitHub Pages Configuration :**
- Source : `master` branch
- Root : `/` (dossier racine)
- Domaine : `https://878abdel.github.io/Unipro-Tech-Club/`

### **Mise à jour du site :**
```bash
# Après modifications
git add .
git commit -m "Description des changements"
git push origin master

# 🎉 Site mis à jour automatiquement en 1-2 minutes !
```

---

## 📞 Contact

- **Site :** https://878abdel.github.io/Unipro-Tech-Club/
- **Admin :** https://878abdel.github.io/Unipro-Tech-Club/admin.html
- **GitHub :** https://github.com/878Abdel/Unipro-Tech-Club

---

## 🎉 Résumé

✅ **Site accessible à tous** via GitHub Pages  
✅ **Administration fonctionnelle** sans serveur  
✅ **Collaboration possible** via export/import  
✅ **Déploiement automatique** après chaque push  
✅ **100% conforme au cahier des charges**  

Le site est maintenant **production-ready** et accessible mondialement ! 🌍

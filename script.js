//windows event
const sectionHeader = document.querySelector('.header-presentation');

function adjustWindow() {
    if (window.innerHeight <= 826) {
        sectionHeader.style.height = "auto";
    } else {
        sectionHeader.style.height = window.innerHeight + 'px';
    }
}

// Ajuste la hauteur lorsque la page est chargée
window.addEventListener('load', adjustWindow);

// Ajuste la hauteur lorsque la fenêtre est redimensionnée
window.addEventListener('resize', adjustWindow);

// Header animation 
let snowRegularization = [];
function createSnowflake() {
   
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const size = Math.random() * 5 + 5 + 'px';
    snowflake.style.width = size;
    snowflake.style.height = size;
    
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 5 + 's';
    snowflake.style.opacity = Math.random();

    document.querySelector('.snowflakes').appendChild(snowflake);
    snowRegularization.push(snowflake);
    // Supprime le flocon de neige une fois l'animation terminée
    if (snowRegularization.length > 20) {
        snowRegularization[0].remove();
        snowRegularization.shift();
    }
    
}
const timerSnow = setInterval(createSnowflake, 800);

// Presentation animation 

const nextPresentationButton = document.querySelector('.button-profil');
const presentation = document.querySelector('.presentation');
nextPresentationButton.addEventListener('click', () => {
    presentation.scrollIntoView({ behavior: 'smooth' });
});

let snowHazardRegularization = [];
let snowInterval;  // Déclare une variable pour stocker l'intervalle

function snowHazard() {
    const newSnowPosition = document.createElement('div');
    newSnowPosition.classList.add('snowshazard')

    const tabOfSize = ['12px', '14px', '16px', '18px', '20px'];
    let sizeRand = Math.floor(Math.random() * tabOfSize.length);
    let sizeRdChoose = tabOfSize[sizeRand];

    newSnowPosition.style.width = sizeRdChoose;
    newSnowPosition.style.height = sizeRdChoose;

    newSnowPosition.style.left = Math.random() * 90 + '%';
    newSnowPosition.style.bottom = Math.random() * 90 + '%';
    newSnowPosition.style.zIndex = 1;

    presentation.appendChild(newSnowPosition);

    snowHazardRegularization.push(newSnowPosition);
   // Supprime le flocon de neige une fois l'animation terminée
   if (snowHazardRegularization.length > 10) {
    snowHazardRegularization[0].remove();
    snowHazardRegularization.shift();
    }
}

presentation.addEventListener('mouseover', () => {
    // Vérifiez si l'intervalle est déjà défini, sinon, définissez-le
     snowInterval = setInterval(snowHazard, 500);
    
});

//Arrête l'animation 
presentation.addEventListener('mouseout', () => {
    clearInterval(snowInterval);
    snowHazardRegularization.forEach((removeDivAnimation) => {
        // Supprime l'élément après la fin de l'animation
        removeDivAnimation.remove();
    });

    // Réinitialise le tableau après la suppression des flocons
    snowHazardRegularization = [];
});

//REALISATION ANIMATION
const filterButtons = document.querySelectorAll('.button-filter');
let buttonClicked = document.querySelector('.active');

//Data-group a filtrer
const projects = Array.from(document.querySelectorAll('.projet a'));


// Ajoute un événement clic pour changer le background du bouton actif et filtrer par groupe
filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // supprime la class du bouton non clicked
        buttonClicked.classList.remove('active');
        event.target.classList.add('active');
        buttonClicked = event.target;
        
        // Récupére la valeur du data-group du bouton cliqué
        const filterValue = button.getAttribute('data-group');

        // Filtre les projets en fonction du data-group
        const filteredProjects = projects.filter(project => {
            const projectGroups = project.getAttribute('data-group').split(' ');
            return filterValue === 'all' || projectGroups.includes(filterValue);
        });

        // Masque tous les projets
        projects.forEach(project => {
            project.style.display = 'none';
        });

        // Affiche uniquement les projets filtrés
        filteredProjects.forEach(project => {
            project.style.display = 'block';
        });

        // Optionnel : Gérer l'état "active" des boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});


// Sélectionner tous les conteneurs où l'effet de tempête de neige sera appliqué
const tempestOfSnowContainers = document.querySelectorAll('.snowstorm-container');

tempestOfSnowContainers.forEach(container => {
    // Variable pour stocker l'intervalle
    let snowStormRegularization = [];
    let snowInterval;

    container.addEventListener('mouseover', () => {
        if (window.innerWidth >= 1024) { // Vérifier la largeur de l'écran
            // génère des flocons 
            snowInterval = setInterval(createTempestSnowflake, 500);

            // Créer des flocons uniquement dans ce conteneur
            function createTempestSnowflake() {
                const snowstorm = document.createElement('div');
                snowstorm.classList.add('snow-tempest');

                const size = Math.random() * 5 + 5 + 'px';
                snowstorm.style.width = size;
                snowstorm.style.height = size;
                snowstorm.style.left = Math.random() * container.offsetWidth + 'px';
                snowstorm.style.top = '0px';

                const duration = Math.random() * 5 + 5 + 's';
                snowstorm.style.animationDuration = duration;

                container.appendChild(snowstorm);

                snowStormRegularization.push(snowstorm);
                // Supprime le flocon de neige une fois l'animation terminée
                if (snowStormRegularization.length > 10) {
                    snowStormRegularization[0].remove();
                    snowStormRegularization.shift();
                }
            }
        }
    });

    container.addEventListener('mouseout', () => {
        clearInterval(snowInterval);
        snowStormRegularization.forEach((removeDivAnimation) => {
            // Supprimer l'élément après la fin de l'animation
            removeDivAnimation.remove();
        });
        // Réinitialiser le tableau pour stocker la tempest
        snowStormRegularization = [];
    });
});

//animation nav pour les screens tab et phone

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuIcon.addEventListener('click', function() {
        nav.classList.toggle('show');

        // Si le menu est visible, masquer à nouveau après un clic
        if (nav.classList.contains('show')) {
            menuIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>'; 
        } else {
            menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>'; 
        }

        //clic sur les liens de navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('show'); // Masquer la navigation
                menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Remettre l'icône de bars
            });
        });
    });
});

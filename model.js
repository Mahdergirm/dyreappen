const model = {
    app: {
        currentPage: 'frontPage',
        isLoggedIn: false,

    },
    
    inputs: {

        filters: {
            selectedAnimals: [],
            selectedCounties: [],
        },

        loginForm: {
            username: null,
            password: null,
        },

        register: {
            name: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            repeatPassword: null,
            animal: null,
        },
        
        info: 
            {
                animal: null,
                rase: null,
                name: null,
                sex: null,
                age: null,
                favouriteActivity: null,
                kg: null,
                location: null,
                readyForPlay: null,
                healthInformation: null,
                availability: null,
                rating: null,
            },
        
        searchField:{
            searchText: null,
        },
        
        ratingForm:{
            rating: null,
        },
        
        messages: {
            sender:"",
            receiver:"",
            message: "",
            date:null, 
        },

        notifications: {
            notification: null,
        },

        animalProfile: {
            name: '',
            id: 1        
        }


    },

    data: {
        categories: {
            animals: ['katt', 'hund', 'fugl', 'hamster', 'slange'],
            
            counties: [
                'Akershus', 'Oslo', 'Vestland', 
                'Trøndelag', 'Innlandet', 'Agder', 'Østfold', 
                'Møre og Romsdal', 'Buskerud', 'Vestfold', 
                'Nordland', 'Telemark', 'Troms', 'Finnmark'
            ]
        },

        users: [
            {
                username: 'varinlinnea',
                password: '',
                email: 'varino@getacademy.no',
                name: 'Vårin',
                animalId: [0],
                userId: 0,
                isAdmin: false,
                picture: '',
                animals: [
                    {
                        name: 'Magnus',
                        age: 14,
                        animal: 'katt',
                        animalBreed: '',
                        kg: '',
                        sex: 'male',
                        favouriteActivities: ['sove', 'spise'],
                        location: 'Vestland',
                        readyForPlay: true,
                        healthInformation: 'frisk',
                        availability: '',
                        picture: 'animalPics/magnus.jpg',
                        rating: 0,
                    },
                ],
            },

        ],


        messages: [
            {
                messageId: 0,
                sender: 'varinlinnea',
                receiver: 'anonym',
                message: 'Hei, vil gjerne sette opp en playdate med dere :)',
                date: '2021-05-24',
            },
        ],

        notifications: [
            {
                notificationId: 0,
                sender: 'anonym',
                receiver: 'varinlinnea',
                notification: 'Ok, la oss sette opp en playdate!',
                date: '2021-05-24',
            },
        ],

    },
};

function login(username, password) {
    const user = model.data.users.find(user => user.username === username);
    if (user) {
        model.app.isLoggedIn = true;
        model.app.currentPage = 'frontPage';
    } else {
        alert('Feil brukernavn eller passord');
    }
}

function register(name, lastName, email, username, password, repeatPassword) {
    if ( password != repeatPassword) {
        alert('Passordene er ikke like');
        return;
    }
    const existingUser = model.data.users.find(user => user.username === username);
    if (existingUser) {
        alert('Brukernavnet er allerede i bruk');
        return;
    }
    const newUser = {
        username,
        password,
        email,
        name,
        lastName,
        animalId: [],
        userId: model.data.users.length,
        isAdmin: false,
        picture: '',
    };
    model.data.users.push(newUser);
    alert('Bruker opprettet');
    model.app.currentPage = 'frontPage';
    updateView();
}

function showPreview(event) {      // Forhåndsvisning av bilde når du registrerer dyr
    const file = event.target.files[0];
    const previewContainer = document.querySelector('.preview');
    previewContainer.innerHTML = ''; // Clear previous content

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded Image';
            img.style.maxWidth = '200px';
            img.style.borderRadius = '5px';
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.innerHTML = '<p>No image selected</p>';
    }
}
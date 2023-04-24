const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/users.js');
const Place = require('./models/place.js');
const Booking = require('./models/booking.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs')
const request = require('request')

require('dotenv').config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10)
// secret helps in siginig token
const jwtSecret = '8116163fcf88fa69ca685be9fd7cbaeb';

// console.log(process.env.MONGO_URL)
mongoose.connect('Your MONGO_URI connection')

app.use(cookieParser());
// parse json
app.use(express.json());
// allowing us to use express in our app from the serer side
app.use('/uploads/', express.static(__dirname + '/uploads'));

// cors enable communcation between api and other part of the app

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3002',
}));



app.get('/test', (request, response) => {
    response.json('test ok');
});

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

app.post('/register', async (request, response) => {
    const { name, email, password } = request.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        // creat collection for users
        response.json(userDoc)
    } catch (e) {
        response.status(422).json(e);
    }
})

app.post('/login', async (request, response) => {
    const { email, password } = request.body;
    // finding user based on user login detail
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            },
                jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    return response.cookie('token', token).json(userDoc)
                })

        } else {
            response.status(422).json('not ok')
        }
    } else {
        response.json('not found')
    }
})

app.get('/profile', (request, respond) => {
    const token = request.cookies['token'];
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id)
            respond.json({ name, email, _id })
        });
    } else {
        respond.json(null)
    }
    // respond.json('User info')
})

app.post('/logout', (request, response) => {
    response.cookie('token', '').json(true);
})

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (request, response) => {
    const uploadedFiles = [];
    for (let i = 0; i < request.files.length; i++) {
        // console.log(request.files[i])
        const { path, originalname: originalName } = request.files[i];
        const parts = originalName.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    response.json(uploadedFiles.map(fileName => ({ fileName })));
})

app.post('/upload-by-link', async (request, response) => {
    const { link } = request.body;
    const newName = 'Photo' + Date.now() + '.jpg'
    await downloadImage(
        link,
        __dirname + '/uploads/' + newName,
    );

    response.json({ fileName: newName })
})

function downloadImage(url, dest) {
    const downloadRequest = request(url).pipe(fs.createWriteStream(dest))

    return new Promise((resolve, reject) => {
        downloadRequest.on('close', resolve)
        downloadRequest.on('error', reject)
    })
}


app.post('/places', (request, response) => {
    const token = request.cookies['token'];
    // console.log({token}, JSON.stringify(request.cookies))
    const {
        title, address, addedPhotos,
        description, perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = request.body


    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        })
        response.json(placeDoc)
    });

});

app.get('/user-places', (request, response) => {
    const token = request.cookies['token'];
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;

        data = response.json(await Place.find({ owner: id }))

    });
});

app.get('/places/:id', async (request, response) => {
    const { id } = request.params;
    response.json(await Place.findById(id))
});

app.put('/places', async (request, response) => {
    // const {id} = request.params;
    const token = request.cookies['token'];
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = request.body

    console.log(addedPhotos)

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        // checks the user id and update the information
        // console.log(token);
        if (err) throw err;
        const placeDoc = await Place.findById(id);

        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            // console.log(placeDoc)
            placeDoc.save().then(console.log);
            // placeDoc.push();
            response.json('ok');
        }
    });
});

app.post('/bookings', (request, response) => {
    const { place, name,
        checkIn, checkOut,
        numberOfGuest, phone, price, user } = request.body;

    Booking.create({
        place, name,
        checkIn, checkOut,
        numberOfGuest, phone, price, user
    }).then((doc) => {
        response.json(doc)
    }).catch((err) => {
        throw err;
    })

})

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
});

// route for homepage
app.get('/places', async (request, response) => {
    response.json(await Place.find())
})

app.listen(5000, console.log('server is starting on port 5000'))

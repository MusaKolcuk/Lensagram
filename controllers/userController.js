import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

const entryMessages = [
    "Hoş geldiniz Lensagram'a! Fotoğrafçılık tutkunlarının buluşma noktası. Burada her bir kare, bir öykü anlatır ve biz de bu öyküleri dinlemek için buradayız. Sizin unutulmaz anılarınızı paylaşmanız için sabırsızlanıyoruz!",
    "Yepyeni bir gün, yepyeni anılar. Lensagram ailesine hoş geldiniz! Bu platformda her bir anınızı paylaşırken, yeni dostluklar kuracak ve harika anılar biriktireceksiniz. Haydi, fotoğraflarınızı bizimle paylaşın ve dünyayı güzelliklerle dolduralım!",
    "Merhaba! Lensagram'a adım atmanın heyecanıyla sizi karşılıyoruz. Burada her anınızı özel kılmak için buluşuyoruz. Fotoğraf çekmek bir sanattır ve bu sanatı birlikte yaşamak için buradayız. Sizinle birlikte, en güzel anlarınızı ölümsüzleştireceğiz!",
    "Göz alıcı fotoğraflarınızı paylaşmanız için sabırsızlanıyoruz! Lensagram ailesine katıldığınız için teşekkür ederiz. Burası sizin için bir platformdan daha fazlası; burası, paylaşım ve keşiflerle dolu bir dünya. Haydi, birlikte bu dünyayı keşfedelim!",
    "Hoş geldiniz! Lensagram'a adım atmanın mutluluğuyla sizi karşılıyoruz. Her karenin bir öyküsü var ve biz de bu öyküleri dinlemek için buradayız. Unutulmaz anlarınızı paylaşmak, yeni dostluklar kurmak ve hayata pozitif enerji katmak için buradayız. Fotoğraf çekmek bir tutku, paylaşmak bir zevk!",
    "Keyifli bir gün geçirin, paylaşılacak güzel anlarınızı bizimle paylaşın! Lensagram ailesine hoş geldiniz. Burası, fotoğraf tutkunlarının buluşma noktası ve her bir anınızı ölümsüzleştirmek için en doğru yer. Sizinle birlikte, dünyayı güzelliklerle dolduracağız!",
    "Fotoğraf çekmek bir sanat, biz de bu sanatı birlikte yaşamak için buradayız! Lensagram ailesine hoş geldiniz. Her bir kare, bir hikaye anlatır ve biz de bu hikayeleri dinlemek için buradayız. Unutulmaz anılarınızı paylaşmak, yeni dostluklar kurmak ve hayata renk katmak için buradayız!",
    "Güneşli günlerinizi, yağmurlu günlerinizi ve hatta karlı günlerinizi paylaşın! Lensagram ailesine hoş geldiniz. Her anınızı özel kılmak için buradayız. Sizinle birlikte, hayatın güzelliklerini paylaşacak, anlarınızı ölümsüzleştirecek ve yeni dostluklar kuracağız. Fotoğraf çekmek bir tutku, burada tutkunuzu yaşamak için harika bir yerdesiniz!",
    "Hoş geldiniz! Lensagram ailesine katıldığınız için teşekkür ederiz. Burası, fotoğraf tutkunlarının buluşma noktası ve her bir kare, bir öykü anlatır. Sizinle birlikte, unutulmaz anlarınızı paylaşacak, yeni dostluklar kuracak ve hayata pozitif enerji katacağız. Fotoğraf çekmek bir tutku, paylaşmak bir zevk!",
    "Bugün harika bir gün! Lensagram ailesine hoş geldiniz. Her bir anınızı özel kılmak için buradayız. Sizinle birlikte, hayatın güzelliklerini paylaşacak, anılarınızı ölümsüzleştirecek ve yeni dostluklar kuracağız. Fotoğraf çekmek bir sanat, burada sanatınızı sergilemek için harika bir yerdesiniz!",
    "Merhaba Lensagram ailesi! Her fotoğraf bir anı, sizinle anılarınızı paylaşmak için buradayız. Sizinle birlikte, hayatın güzelliklerini paylaşacak, anılarınızı ölümsüzleştirecek ve yeni dostluklar kuracağız. Fotoğraf çekmek bir tutku, burada tutkunuzu yaşamak için harika bir yerdesiniz!",
    "Keyifli anlarınızı paylaşmak için mükemmel bir gün! Lensagram ailesine hoş geldiniz. Her bir kare, bir hikaye anlatır ve biz de bu hikayeleri dinlemek için buradayız. Sizinle birlikte, hayatın güzelliklerini paylaşacak, anılarınızı ölümsüzleştirecek ve yeni dostluklar kuracağız. Fotoğraf çekmek bir sanat, burada sanatınızı sergilemek için harika bir yerdesiniz!",
    "Sonsuz anıları Lensagram'da paylaşın. Hoş geldiniz! Her bir kare, bir öykü anlatır ve biz de bu öyküleri dinlemek için buradayız. Sizinle birlikte, hayatın güzelliklerini paylaşacak, anılarınızı ölümsüzleştirecek ve yeni dostluklar kuracağız. Fotoğraf çekmek bir tutku, burada tutkunuzu yaşamak için harika bir yerdesiniz!",
    "Fotoğraf çekmek bir tutku, biz de bu tutkuyu paylaşmak için buradayız. Lensagram ailesine hoş geldiniz. Her bir kare, bir hikaye anlatır ve biz de bu hikayeleri dinlemek için buradayız. Sizinle birlikte, hayatın güzelliğini paylaşacak, anılarınızı ölümsüzleştirecek ve yeni dostluklar kuracağız!",

];


const createUser = async (req, res) => {
    try {
        // Kullanıcı oluşturulurken rastgele bir giriş metni seçilir
        const randomIndex = Math.floor(Math.random() * entryMessages.length);
        const randomEntryMessage = entryMessages[randomIndex];

        // Kullanıcı oluşturulur ve seçilen giriş metni atanır
        const user = await User.create({
            ...req.body,
            introText: randomEntryMessage // Kullanıcıya atanacak rastgele giriş metni
        });

        res.status(201).json({ user: user._id });
    } catch (error) {
        // Hata yönetimi
        console.log("ERROR", error);
        let errors2 = {};

        if (error.code === 11000) {
            errors2.email = "The Email is already registered";
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
        }

        res.status(400).json(errors2);
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.redirect("/login?error=User Not Found !");
        }

        if (same) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });

            const randomIndex = Math.floor(Math.random() * entryMessages.length);
            const randomEntryMessage = entryMessages[randomIndex];
            await User.findByIdAndUpdate(user._id, { introText: randomEntryMessage });

            res.redirect("/users/dashboard");
        } else {
            res.redirect("/login?error=Wrong Password !");
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};


// Token olusturma
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',                        // Token in gecerlilik suresi 1d yani 1 day(1gün)
    })
}

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id });
    const user = await User.findById({ _id: res.locals.user._id }).populate([
        "followings",
        "followers",
    ]);    //kullanici takip eden ve edilenleri gorebilmek icin
    res.render("dashboard", {
        link: "dashboard",
        photos,
        user,
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } });//sadece _id alani  $ne : res.locals.user._id ye esit olmayanlari sectik yani login yaptigimiz hesap görüntülenmez.
        res.status(200).render('users', {
            users,
            link: 'users',
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const getAUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })

        const inFollowers = user.followers.some((follower) => {
            return follower.equals(res.locals.user._id);
        });

        const photos = await Photo.find({ user: user._id })   // gittigimiz tekil kullanici sayfasindaki kullaniciya ait fotograflari getir.
        res.status(200).render('user', {
            user,
            photos,
            link: 'users',
            inFollowers,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const follow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: { followers: res.locals.user._id }
            },
            { new: true },
        );

        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            {
                $push: { followings: req.params.id }
            },
            { new: true },
        );

        res.status(200).redirect(`/users/${req.params.id}`);

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const unfollow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { followers: res.locals.user._id }
            },
            { new: true },
        );

        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            {
                $pull: { followings: req.params.id }
            },
            { new: true },
        );

        res.status(200).redirect(`/users/${req.params.id}`);

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};




export { createUser, loginUser, createToken, getDashboardPage, getAllUsers, getAUser, follow, unfollow, };
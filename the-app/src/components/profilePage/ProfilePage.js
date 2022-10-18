import "./ProfilePage.scss";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import face from "../../assets/face.jpg";
import {
    onAuthStateChanged,
    updateProfile,
    updateEmail,
    deleteUser, 
  } from "firebase/auth"
import { auth, storage } from "../../firebase/firebase"
import { useEffect, useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const ProfilePage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    if (imgUrl == null){
        setImgUrl("https://www.pngitem.com/pimgs/m/146-1468465_early-signs-of-conception-user-profile-icon-hd.png")
    }
    useEffect(() => {
         onAuthStateChanged(auth, (user) => {
          setName(user.displayName);
          setEmail(user.email);
          setPhoneNumber(user.phoneNumber);
          setImgUrl(user.photoURL)
        //   console.log('user', user);
        });
        
      }, []);

   
      const deleteProfile = () => {
        deleteUser(auth.currentUser).then(() => {
            console.log('User deleted');
          }).catch((error) => {
            console.log('An error ocurred', error);
          });
      }

      const handleChangeUserInfo = (event) => {
        event.preventDefault();
        if (event.target[0].value !== '') {
            updateProfile(auth.currentUser, {
                displayName: event.target[0].value, 
            }).then(() => {
                console.log('Profile updated!');
            }).catch((error) => {
                console.log('An error occurred',error);
            });
            setName(event.target[0].value);
            event.target[0].value = '';
        } 
        if (event.target[1].value !== '') {
            updateEmail(auth.currentUser, event.target[1].value).then(() => {
                console.log('Email updated!');
            }).catch((error) => {
                console.log('An error occurred');
            });
            setEmail(event.target[1].value);
            event.target[1].value = '';
        }
        
    }

    
    const handleSubmitImg = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
    
        if (!file) return;
    
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgUrl(downloadURL)
              updateProfile(auth.currentUser, {
                photoURL: downloadURL
            }).then(() => {
                console.log('ProfileFoto updated!');
            }).catch((error) => {
                console.log('An error occurred',error);
            });
            });
          }
        );
       
      }

    return (
        <div className="profile">
            <div className="container">
                <div className="crumbs">
                    <Link to="/">Главная</Link> - <p>Профиль</p>
                </div>
                <div className="profile-content">
                <form action="" onSubmit={handleSubmitImg}>
                    <h2 className="profile-title">Фото профиля</h2>
                    <div className="profile-user">
                        {/* <img className="profile-img" src="https://www.pngitem.com/pimgs/m/146-1468465_early-signs-of-conception-user-profile-icon-hd.png" alt="" /> */}
                        <img src={imgUrl} alt='uploaded file' className="profile-img" />
                        <label className="input-file">
                            <input type="file" name="file"/>        
                            <span>Выберать файл</span>
                        </label>
                        <button className="profile-btn" type='submit'>Загрузить</button>
                        <p className="profile-icon"><BiTrash /></p>
                    </div>
                    <p className="profile-info">Максимальный размер фото 5 МБ</p>
                </form>
                    <h3 className="profile-title main-title">Личная информация</h3>
                    
                    <form action="" onSubmit={handleChangeUserInfo}>
                        <p className="profile-title">Моё имя: {name}</p>
                        <input className="profile-input" placeholder="Введите имя" type="text" />
                        <p className="profile-title">Email: {email}</p>
                        <input className="profile-input" placeholder="Введите email" type="text"/>
                        {/* <p className="profile-title">Обо мне</p>
                        <input className="profile-input2" placeholder="Расскажите что-нибудь о себе" type="text" /> */}
                        <p className="profile-title">Номер телефона: {phoneNumber} </p>
                        <input className="profile-input" placeholder="Введите номер телефона" type="tel" />
                        <button className="profile-btn2">Сохранить</button>
                    </form>
                    <h3 className="profile-title main-title">Измненение пароля</h3>
                    <form>
                        <p className="profile-title">Текущий пароль</p>
                        <input className="profile-input" placeholder="Текущий пароль" type="password" />
                        <p className="profile-title">Новый пароль</p>
                        <input className="profile-input" placeholder="Пароль" type="password" />
                        <p className="profile-title">Подтвердите пароль</p>
                        <input className="profile-input" placeholder="Пароль" type="password" />
                        <button className="profile-btn2">Сохранить</button>
                    </form>
                    <h3 className="profile-title main-title">Удаление профиля</h3>
                    <p className="profile-remove" onClick={deleteProfile}><span className="profile-remove-icon"><BiTrash /></span>Удалить профиль</p>
                </div>
            </div>
        </div>
    );
};






export default ProfilePage;
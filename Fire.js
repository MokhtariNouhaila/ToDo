import firebase from 'firebase';
import "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAcR_-PGZ3x6TPvSNRTw10H6yi_Tmjycl4",
    authDomain: "todoapp-f419d.firebaseapp.com",
    databaseURL: "https://todoapp-f419d.firebaseio.com",
    projectId: "todoapp-f419d",
    storageBucket: "todoapp-f419d.appspot.com",
    messagingSenderId: "1027900902428",
    appId: "1:1027900902428:web:02d39b6196265a3923e3d9"
}
class Fire {
    constructor(callback) {
        this.init(callback)
        this.getLists(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);

        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)

            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => { callback(error) });
            }
        })
    }
    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });

            });
            callback(lists);

        })


    }
    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc("uLBrTdCqfJWzTZnMIJHa")
        .collection("lists")
        ;
    }
    get userId() {
        return firebase.auth().currentUser.uid;
    }
    addList(list)
    {
        let ref=this.ref;
        ref.add(list);
    }
    updateList(list)
    {
    
        let ref=this.ref;
        ref.doc(list.id).update(list);
    }
    deleteList(list){
        let ref = this.ref;
        ref.doc(list.id).delete()
    }
    detach() {
        this.unsubscribe();
    }
}
export default Fire;
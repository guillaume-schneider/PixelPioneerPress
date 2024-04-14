const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createConversation = functions.firestore
    .document('users/{userId}/friends/{friendId}')
    .onCreate(async (snap: any, context: { params: { userId: any; friendId: any; }; }) => {
        const { userId, friendId } = context.params;

        // Create a new conversation
        const conversationRef = admin.firestore().collection('conversations').doc();
        await conversationRef.set({
            participants: {
                [userId]: true,
                [friendId]: true
            },
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log('New conversation created with ID:', conversationRef.id);
    });

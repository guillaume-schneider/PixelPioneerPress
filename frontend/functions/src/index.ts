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

exports.notifyUnreadMessageCount = functions.firestore
.document('conversations/{conversationId}/unreadMessageCount/{userId}')
.onUpdate(async (change: { after: { data: () => any; }; before: { data: () => any; }; }, context: { params: { userId: any; conversationId: any; }; }) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();

  if (newValue.message_count !== previousValue.message_count) {
    const userId = context.params.userId;
    const conversationId = context.params.conversationId;

    // Mettre à jour la valeur dans la base de données Realtime Database
    admin.database().ref(`users/${userId}/unreadMessageCount/${conversationId}`).set(newValue.message_count);
  }
});

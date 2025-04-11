import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
    'https://rmzcougkqzosuycyhhen.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtemNvdWdrcXpvc3V5Y3loaGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTc4OTQsImV4cCI6MjA1NDMzMzg5NH0.koM4dJ6UZ6y2Cq2l2GVCERWZ3-DuuDreuJJsIKkKll4'
);

function showPopup() {
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
    setTimeout(() => {
        window.location.href = 'support.html';
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('support-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const feedbackType = document.getElementById('feedback-type').value;

        var tableName;
        if (feedbackType === 'complaint') {
            tableName = 'complaints';
        } else if (feedbackType === 'suggestion') {
            tableName = 'suggestions';
        } else {
            alert('Geçersiz geri bildirim türü!');
            return;
        }

        const { data, error } = await supabase
            .from(tableName)
            .insert([{
                name: name,
                email: email,
                message: message
            }]);

        if (error) {
            console.error('Error inserting data: ', error);
            alert('Bir hata oluştu, lütfen tekrar deneyin.');
        } else {
            console.log('Data inserted:', data);
            showPopup();
        }
    });

    const closeBtn = document.getElementById('popup-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
});

import { plantTypeMap, diseaseMap } from './data.js';

function previewImage() {
    const file = document.getElementById('file-input').files[0];
    const preview = document.getElementById('image-preview');

    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function handleFileSelect() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    document.getElementById('result').innerHTML = "";

    if (file) {
        previewImage();
        document.getElementById('upload-btn').style.display = 'inline-block';
    } else {
        document.getElementById('upload-btn').style.display = 'none';
    }
}


export async function uploadImage() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
        alert("Lütfen bir resim seçin!");
        return;
    }

    previewImage();

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("https://batukrma-plant-species.hf.space/detect", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const plantTr = plantTypeMap[data.label] || data.label;
            const diseaseTr = diseaseMap[data.disease_prediction] || data.disease_prediction;

            document.getElementById("result").innerHTML = `
                <h3>Sonuç:</h3>
                <p><strong>Bitki Türü:</strong> ${plantTr}</p>
                <p><strong>Hastalık:</strong> ${diseaseTr}</p>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p style="color:red;">Hata: ${data.detail || "Bilinmeyen hata"}</p>`;
            console.error("API Hatası:", data);
        }
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        alert("Bir hata oluştu!");
    }
}

window.handleFileSelect = handleFileSelect;

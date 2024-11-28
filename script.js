document.addEventListener("DOMContentLoaded", function () {
    const imageUploader = document.getElementById("imageUploader");
    const removeButton = document.getElementById("removeBackground");
    const resultImage = document.getElementById("resultImage");
    const output = document.getElementById("output");
    const downloadLink = document.getElementById("downloadLink");
    const previewSection = document.getElementById("previewSection");
    const previewImage = document.getElementById("previewImage");

    // Masukkan API Key Anda di sini
    const API_KEY = "juvcQBzgKiNY2x5NJtSfKvri";

    // Fungsi untuk menampilkan preview gambar
    imageUploader.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          previewImage.src = e.target.result; // Menampilkan gambar preview
          previewSection.classList.remove("hidden"); // Menampilkan section preview
          removeButton.style.display = "inline-block"; // Menampilkan tombol "Hapus Background"
          removeButton.disabled = false; // Mengaktifkan tombol
        };

        reader.readAsDataURL(file);
      } else {
        previewSection.classList.add("hidden"); // Menyembunyikan preview
        removeButton.style.display = "none"; // Menyembunyikan tombol "Hapus Background"
        removeButton.disabled = true; // Menonaktifkan tombol
      }
    });

    // Fungsi untuk menghapus background menggunakan API remove.bg
    removeButton.addEventListener("click", async () => {
      const file = imageUploader.files[0];
      if (!file) {
        alert("Unggah gambar terlebih dahulu!");
        return;
      }

      const formData = new FormData();
      formData.append("image_file", file);

      try {
        removeButton.textContent = "Memproses...";
        removeButton.disabled = true;

        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          headers: {
            "X-Api-Key": API_KEY,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus background. Periksa API key Anda.");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        resultImage.src = imageUrl;
        output.classList.remove("hidden");
        downloadLink.href = imageUrl;

        removeButton.textContent = "Hapus Background";
        removeButton.disabled = false;
      } catch (error) {
        alert(error.message);
        removeButton.textContent = "Hapus Background";
        removeButton.disabled = false;
      }
    });
  });
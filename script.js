document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', () => {
        // Set the APK file path from the rsc folder
        const apkUrl = 'rsc/Parkinson.apk';
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = apkUrl;
        link.download = 'Parkinson.apk';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
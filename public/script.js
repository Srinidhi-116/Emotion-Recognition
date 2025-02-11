function analyzeEmotion() {
    const inputText = document.getElementById('input').value;
    fetch(`emorecog2.netlify.app/emotion?text=${encodeURIComponent(inputText)}`)
        .then(response => response.json())
        .then(data => {
            const emoji = getEmojiForScore(data.score);
            document.getElementById('emojiDisplay').innerText = emoji;
        })
        .catch(error => {
            console.log('Error:'+ error);
        });
}

function getEmojiForScore(score) {
    if (score > 10) {
        return '🤩'; // Extremely positive
    } else if (score > 8) {
        return '😁'; // Very positive
    } else if (score > 6) {
        return '😃'; // Positive
    } else if (score > 4) {
        return '😊'; // Moderately positive
    } else if (score > 2) {
        return '🙂'; // Slightly positive
    } else if (score > 0) {
        return '😌'; // Barely positive
    } else if (score === 0) {
        return '😐'; // Neutral
    } else if (score > -2) {
        return '😕'; // Barely negative
    } else if (score > -4) {
        return '🙁'; // Slightly negative
    } else if (score > -6) {
        return '😟'; // Moderately negative
    } else if (score > -8) {
        return '😢'; // Negative
    } else if (score > -10) {
        return '😭'; // Very negative
    } else {
        return '😠'; // Extremely negative
    }
}



document.getElementById("send-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value;

    if (userInput === '') {
        document.getElementById("response").textContent = '質問を入力してください。';
        return;
    }

    // GitHub ModelsのAPIにリクエストを送信
    fetch('https://api.githubmodels.com/v1/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_API_KEY`,  // APIキーを入力
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama-3.1",  // Llama 3.1モデル
            prompt: userInput,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").textContent = data.choices[0].text;
    })
    .catch(error => {
        document.getElementById("response").textContent = `エラーが発生しました: ${error.message}`;
    });
});

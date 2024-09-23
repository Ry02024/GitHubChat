let apiKey = '';  // ユーザーが入力したPATを格納する変数

// 認証ボタンがクリックされたとき
document.getElementById("auth-btn").addEventListener("click", function() {
    apiKey = document.getElementById("pat-input").value;

    if (apiKey === '') {
        document.getElementById("auth-status").textContent = 'APIキーを入力してください。';
        return;
    }

    // APIキーの簡単なチェック（ここではテストとしてダミーリクエストを送信して確認）
    fetch('https://api.githubmodels.com/v1/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,  // 入力されたAPIキーを使用
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama-3.1",
            prompt: "認証確認",
            max_tokens: 5
        })
    })
    .then(response => {
        if (response.ok) {
            // 認証成功時にチャット欄を表示
            document.getElementById("auth-section").style.display = 'none';  // 認証セクションを非表示
            document.getElementById("chat-section").style.display = 'block';  // チャットセクションを表示
            document.getElementById("auth-status").textContent = '';
        } else {
            throw new Error('認証に失敗しました。APIキーを確認してください。');
        }
    })
    .catch(error => {
        document.getElementById("auth-status").textContent = error.message;
    });
});

// チャットボタンがクリックされたとき
document.getElementById("send-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value;

    if (userInput === '') {
        document.getElementById("response").textContent = '質問を入力してください。';
        return;
    }

    // GitHub Models APIにリクエストを送信
    fetch('https://api.githubmodels.com/v1/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,  // ユーザーが入力したAPIキーを使用
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

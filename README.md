# Quick TOTP Bookmarklet
QUick Skip 2 Factor Authenticationはブラウザのブックマークから、2段階認証（TOTP）コードを即座に生成するただの軽量スクリプトです。

## 使い方

0. [こちらのコード](https://github.com/asterf/QS2/raw/main/script.js)をブックマークレットとして実行するか、devToolsのconsoleで実行してください。
1. Enterをｵｼﾃｸﾀﾞｻｲ
2. プロンプトにbase32形式のシークレットシードを入力してください。
3. Enter
4. ちょっとしたらなんか出てくると思います、それのコードをコピってくださいませ。

## Error内容
もしError出たらご冥福をお祈りします。(chatGPT)[https://chatgpt.com]とか(Perplexity)[https://perplexity.ai]に聞いてください。
もう1回実行するとかしてから聞くことをお勧めしますが。

一応一覧:
### This script must be excuted in 'https' or 'localhost'.
httpsのサイトで実行してください。
### This script depends 'globalThis.\*\*\*' but it's not found.
httpsのサイトで実行してください。解決しなかったらAI様に聞いてください
### Invalid Base32 Seed
入力した値が間違っています。詳しくはAIさんに。
### Error Occurred: \*\*\*
まずいっ。AIさんに頼ってくださいお願いします。

## 注意
- 空のページ（about:blank）では crypto APIが利用できないため動作しません。
- 問題が発生しても責任は負いません。
- セキュリティは知りません。セキュリティを気にするなら普通に2FA使ってね。
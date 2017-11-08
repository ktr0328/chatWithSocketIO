# CHAT w/ socket.io
socket.io使ってExpressでチャット  

```
$ npm i
$ npm start
```  

[GitHub](http://github.com/ktr0328/chatWithSocketIO)  
[localhost:3000](http://localhost:3000/)

CDNで読んでいるがためのエラーがあるため、あえてbundle.jsもいれてます  

| username | password |
|:---------|:---------|
| hoge     | hoge     |
| hogee    | hogee    |
| hoge2    | hoge2    |
| hoge3    | hoge3    |

## 仕様
- 基本的なチャット
- Express使用
- ユーザー機能 (ログイン / 新規登録) @NEDBへ保存
- チャットログの保存はなし
- ユーザーリストクリックでプライベート送信を変更させたが、不具合というか思い通りでない部分あり。
- CDNでsocketを呼ぶせいでentry.tsでエラーが消えずwebpackがずっとエラーを吐くが一応うまくいく。
- 継ぎ足し続けた結果UIが悪い

#### Homework
- [x] connect/disconnectの通知
- [x] ニックネーム
- [ ] 自身への送信なし。代わりに直接表示
- [x] user typingの通知
- [x] 誰がオンラインかの表示
- [x] プライベート送信

自身への送信なしに関しては設計ミスでそこそこ面倒になってしまったため。  
気の向くままに作っていたらMessageクラスの作成タイミングを間違えました。

## 所感
じゃゔぁとくらべてすごくらくでした。  
あきてほかのことしたくなりました。

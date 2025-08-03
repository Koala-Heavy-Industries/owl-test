# OWL推論Webアプリケーション

Apache Jena FusekiとNode.js/Expressを使用したOWL推論Webアプリケーションです。

## 機能

- OWL/RDFデータのアップロード
- SPARQLクエリの実行
- OWL推論の実行
- 家族関係のサンプルオントロジー

## 起動方法

```bash
# Dockerコンテナの起動
docker-compose up -d

# アプリケーションへのアクセス
# Webアプリ: http://localhost:8080
# Fuseki管理画面: http://localhost:3030
```

## 使い方

1. **OWLデータのアップロード**
   - 「サンプルOWLをロード」ボタンをクリックして、家族関係のサンプルデータをロード
   - 「Fusekiにアップロード」ボタンをクリックしてデータをアップロード

2. **SPARQLクエリの実行**
   - 用意されたサンプルクエリボタンをクリック、または独自のクエリを入力
   - 「クエリを実行」ボタンをクリックして結果を表示

## サンプルクエリ

- **すべての人物を取得**: Person クラスのインスタンスを取得
- **親を取得**: Parent クラスのインスタンスとその子供を取得
- **子供を取得**: hasParent プロパティを持つインスタンスを取得
- **推論クエリ**: 親子関係の推論結果を取得
- **クラス階層を取得**: オントロジー内のクラス階層を表示

## 技術スタック

- Apache Jena Fuseki: トリプルストアとSPARQLエンドポイント
- Node.js + Express: バックエンドAPI
- HTML/CSS/JavaScript: フロントエンド
- Docker Compose: コンテナオーケストレーション
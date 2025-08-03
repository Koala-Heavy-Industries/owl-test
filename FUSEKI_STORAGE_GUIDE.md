# Fusekiのデータ保存方法

## 1. 現在の設定（メモリ内保存）

```yaml
command: ["/jena-fuseki/fuseki-server", "--update", "--mem", "/ds"]
```

- **保存場所**: RAM（メモリ）内
- **メリット**: 
  - 非常に高速
  - セットアップが簡単
- **デメリット**: 
  - コンテナ停止でデータ消失
  - 大量データには不向き

## 2. 永続化する方法

### 方法1: ボリュームマウント（推奨）

`docker-compose-persistent.yaml`を使用：

```bash
# 永続化版で起動
docker-compose -f docker-compose-persistent.yaml up -d
```

**仕組み**:
- ホストの`./fuseki-data`ディレクトリにデータを保存
- コンテナを削除してもデータは残る
- バックアップも簡単（ディレクトリをコピーするだけ）

### 方法2: Dockerボリューム

```yaml
volumes:
  fuseki-data:

services:
  fuseki:
    volumes:
      - fuseki-data:/fuseki
```

**特徴**:
- Dockerが管理する専用領域
- OSに依存しない
- 直接アクセスは難しい

## 3. Fuseki内部のデータ構造

Fusekiがデータを保存する場所：

```
/fuseki/
├── configuration/     # 設定ファイル
├── databases/        # データベースファイル
│   └── ds/          # データセット「ds」のデータ
│       ├── GOSP.dat # グラフデータ
│       ├── GOSP.idn # インデックス
│       └── ...      # その他のインデックスファイル
├── logs/            # ログファイル
└── shiro.ini        # 認証設定
```

## 4. データのバックアップ方法

### メモリ版の場合
```bash
# SPARQLでデータをエクスポート
curl -X GET "http://localhost:3030/ds/data?default" > backup.ttl
```

### 永続化版の場合
```bash
# ディレクトリごとバックアップ
tar -czf fuseki-backup.tar.gz ./fuseki-data
```

## 5. 使い分けの指針

### メモリ版を使う場合
- 開発・テスト環境
- 一時的な実験
- 小規模データ（数千トリプル程度）

### 永続化版を使う場合
- 本番環境
- 大規模データ
- 長期的なプロジェクト

## 6. パフォーマンスの違い

| 項目 | メモリ版 | ファイル版 |
|------|---------|-----------|
| 読み込み速度 | 非常に高速 | 高速 |
| 書き込み速度 | 非常に高速 | やや遅い |
| データ容量制限 | RAMサイズまで | ディスク容量まで |
| 起動時間 | 即座 | データ量に応じて遅い |
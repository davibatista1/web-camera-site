# WebView Camera Bridge

Este projeto demonstra uma **integração simples entre uma página Web (HTML + JavaScript)** e **apps mobile via WebView**, permitindo:

* 📷 Abertura da câmera a partir do JavaScript
* 🔁 Comunicação Web → App (Flutter ou React Native)
* 🖼️ Retorno da imagem capturada para a WebView em Base64
* 🌐 Fallback automático para navegador comum (sem app)

O mesmo código web funciona em:

* Flutter (`webview_flutter`)
* React Native (`react-native-webview`)
* Navegadores desktop/mobile

---

## 📄 index.html

Arquivo HTML principal carregado dentro da WebView ou no navegador.

### Responsabilidades

* Estrutura visual da página
* Botões de interação
* Exibição da imagem capturada
* Envio de mensagens para o app nativo


> ⚠️ **Importante:** o nome `NativeApp` deve ser o mesmo definido no `JavaScriptChannel` do Flutter ou no `window.ReactNativeWebView` no React Native.

---

### Fluxo de funcionamento

1. Usuário clica em **Tirar foto**
2. O script detecta o ambiente:

   * Flutter WebView → `window.NativeApp`
   * React Native WebView → `window.ReactNativeWebView`
   * Navegador comum → fallback HTML (`<input type="file">`)
3. O app nativo abre a câmera
4. A imagem retorna em **Base64**
5. A WebView exibe a foto

---

## 🔌 Integração com Flutter (resumo)

No Flutter, a WebView deve registrar o canal:

```dart
.addJavaScriptChannel(
  'NativeApp',
  onMessageReceived: _onMessage,
)
```

E retornar a imagem para a WebView:

```dart
_controller.runJavaScript(
  "window.onPhotoCaptured('$base64')",
);
```

---

## 🧠 Observação final

Este projeto foi criado para aplicar aprendizados de estudos em integrações Web + Mobile
Esse projeto deve ser buildado em local host. Você pode usar o comando ```python -m http.server 3000``` e acessar ```http://localhost:3000/``` para validar o funcionamento.

Você pode conferir a implementação no seguinte repositório Flutter:
https://github.com/davibatista1/webview-camera-app


Se você usa **Flutter + WebView**, este é um padrão sólido e seguro para integração.

using System;
using UnityEngine;
using UnityEngine.UI;
using UniRx;
using UniRx.Triggers;

public class WebPageView : MonoBehaviour
{
    private WebViewObject _webViewObject;
    
    [SerializeField]
    private Button _backButton;
    public Button BackButton => _backButton;
    
    [SerializeField]
    private Button _forwardButton;

    public Button ForwardButton => _forwardButton;
    
    [SerializeField] private int _marginT = 100, _marginR = 100, _marginB = 100, _marginL = 100;

    public IReadOnlyReactiveProperty<bool> CanGoBack => this.UpdateAsObservable()
        .Select(_ => _webViewObject.CanGoBack())
        .ToReadOnlyReactiveProperty();
    
    public IReadOnlyReactiveProperty<bool> CanGoForward => this.UpdateAsObservable()
        .Select(_ => _webViewObject.CanGoForward())
        .ToReadOnlyReactiveProperty();

    public void Initialize(string url)
    {
        _webViewObject = new GameObject("WebViewObject").AddComponent<WebViewObject>();
        _webViewObject.Init(
            ld: (msg) => Debug.Log($"CallOnLoaded[{msg}]"),
            enableWKWebView: true);
        
#if UNITY_EDITOR_OSX || UNITY_STANDALONE_OSX
        _webViewObject.bitmapRefreshCycle = 1;
#endif
        
        _webViewObject.SetMargins(_marginL, _marginT, _marginR, _marginB);
        _webViewObject.SetVisibility(true);
        
        _webViewObject.LoadURL("https://www.google.co.jp");
    }
    
    public void GoBack()
    {
        _webViewObject.GoBack();
    }
    
    public void GoForward()
    {
        _webViewObject.GoForward();
    }

    private void Start()
    {
        CanGoBack.Subscribe(canGoBack => _backButton.interactable = canGoBack).AddTo(this);
        CanGoForward.Subscribe(canGoForward => _forwardButton.interactable = canGoForward).AddTo(this);
    }
}

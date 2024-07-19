
using UnityEngine;
using UniRx;

public class WebPagePresenter : MonoBehaviour
{
    [SerializeField] private WebPageView _view;
    [SerializeField] private string _url;
    
    private void Start()
    {
        _view.Initialize(_url);

        _view.BackButton.OnClickAsObservable()
            .Subscribe(_ =>
            {
                _view.GoBack();
            }).AddTo(this);
        
        _view.ForwardButton.OnClickAsObservable()
            .Subscribe(_ =>
            {
                _view.GoForward();
            }).AddTo(this);
    }
}

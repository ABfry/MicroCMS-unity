
using UnityEngine;
using UniRx;
using System.Text.RegularExpressions;

public class WebPagePresenter : MonoBehaviour
{
    [SerializeField] private WebPageView _view;
    [SerializeField] private string _url;
    
    private void Start()
    {
        if (JudgeIsUrlValid(_url))
        {
            _view.Initialize(_url);
        }else
        {
            Debug.LogError("URLが正しくないよ");
        }
        

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
    
    private string PATTERN = @"https?://[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+"; //URLを表す正規表現
    private bool JudgeIsUrlValid(string url)
    {
        bool result = Regex.IsMatch(url, PATTERN);
        return result;
    }
}

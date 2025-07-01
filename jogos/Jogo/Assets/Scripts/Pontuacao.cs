using System.Collections;
using System.Collections.Generic;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;

public class Pontuacao : MonoBehaviour
{
    [SerializeField]
    private TextMeshProUGUI textoPontuacao;

    public int Pontos { get; private set; }

    

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void Pontuar(int pontosParaAdicionar) {
        Pontos += pontosParaAdicionar;
        textoPontuacao.text = Pontos.ToString();
    }
}

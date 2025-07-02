using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.VersionControl;
using UnityEngine;
using UnityEngine.UI;

public class GerenciadorQuiz : MonoBehaviour
{

    [SerializeField]
    private List<Pergunta> perguntas;
    [SerializeField]
    private int perguntaAtualIndice;


    [SerializeField]
    private PainelQuiz painelQuiz;
    [SerializeField]
    private Button botaoAvancar;

    // Start is called before the first frame update
    void Start()
    {
        perguntas = Resources.LoadAll<Pergunta>("Perguntas/").ToList();
        perguntaAtualIndice = 0;
        painelQuiz.CarregarPergunta(perguntas[0]);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    

    public void Avancar() {
        botaoAvancar.interactable = false;
        if (painelQuiz.tentativasRestantes > 0) {
            perguntaAtualIndice++;

            if (perguntaAtualIndice < perguntas.Count) {
                painelQuiz.CarregarPergunta(perguntas[perguntaAtualIndice]);
            }
            else {
                //tela de fim POR TODAS AS QUESTOES
            }
        }
        else {
            //tela de fim POR TENTATIVAS
        }
    }

    public void proximaPergunta() {
        
    }

}

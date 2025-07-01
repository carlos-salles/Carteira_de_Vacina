using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class PainelQuiz : MonoBehaviour
{
    [SerializeField]
    private TextMeshProUGUI textoEnunciado;
    [SerializeField]
    private TextMeshProUGUI textoChances;
    [SerializeField]
    private Button botaoAvancar;

    [SerializeField]
    private Pergunta pergunta;

    [SerializeField]
    private Pontuacao pontuacao;

    private Alternativa[] alternativaBotoes;

    public bool PerguntaRespondida { get; private set; }
    public int tentativasRestantes { get; private set; }

    void Awake()
    {
        tentativasRestantes = 3;
        alternativaBotoes = GetComponentsInChildren<Alternativa>();

    }
    // Start is called before the first frame update
    void Start()
    {
        CarregarPergunta(pergunta);
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void CarregarPergunta()
    {
        PerguntaRespondida = false;

        textoEnunciado.text = pergunta.enunciado;
        for (int i = 0; i < pergunta.alternativas.Length; i++)
        {
            alternativaBotoes[i].SetAlternativa(pergunta.alternativas[i], i == pergunta.respostaCorreta);
        }
    }
    public void CarregarPergunta(Pergunta pergunta)
    {
        this.pergunta = pergunta;
        CarregarPergunta();
    }

    public void TerminarPergunta(Alternativa alternativaEscolhida) {
        if (!PerguntaRespondida) {
            foreach (var alternativa in alternativaBotoes) {
                alternativa.ativarCores();
            }
            alternativaEscolhida.adicionarContorno();

            if (alternativaEscolhida.alternativaCorreta) {
                pontuacao?.Pontuar(10);
            }
            else {
                tentativasRestantes -= 1;
                textoChances.text = "Tentativas restantes: " + tentativasRestantes;
            }
            if (botaoAvancar != null) {
                botaoAvancar.interactable = true;   
            }
        }

        PerguntaRespondida = true;
    }
}

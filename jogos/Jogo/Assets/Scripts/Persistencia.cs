using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Persistencia : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void salvarRecorde(Pontuacao pontuacao) {
        PlayerPrefs.SetInt("recorde", pontuacao.Pontos);
        PlayerPrefs.Save();
    }
}

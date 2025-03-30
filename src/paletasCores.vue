<template>
  <div class="paleta-cores-pastel">
    <h1>Dicas para Criar sua Paleta de Cores Pastel</h1>

    <p>
      Este guia resume as dicas para desenvolver uma paleta de cores pastéis
      para o seu aplicativo de gerenciamento de reuniões, utilizando as cores da
      faculdade como base:
    </p>

    <h2>1. Entenda as Cores Base da Faculdade</h2>
    <div class="color-info">
      <p>As cores principais da faculdade são:</p>
      <ul>
        <li>
          Verde Escuro:
          <span class="color-box" style="background-color: #317d3d"></span>
          #317d3d
        </li>
        <li>
          Verde Claro:
          <span class="color-box" style="background-color: #8ec543"></span>
          #8ec543
        </li>
        <li>
          Branco:
          <span class="color-box" style="background-color: #ffffff"></span>
          #ffffff
        </li>
      </ul>
    </div>

    <h2>2. Transformando as Cores Base em Pastéis</h2>
    <div class="color-info">
      <p>
        Cores pastéis são versões mais claras e suaves das cores originais.
        Exemplos:
      </p>
      <ul>
        <li>
          Verde Pastel (Baseado no Verde Escuro):
          <span class="color-box" style="background-color: #a8d5ad"></span>
          #a8d5ad
        </li>
        <li>
          Verde Pastel Claro (Baseado no Verde Claro):
          <span class="color-box" style="background-color: #d1edb7"></span>
          #d1edb7
        </li>
        <li>
          Branco:
          <span class="color-box" style="background-color: #ffffff"></span>
          #ffffff
        </li>
      </ul>
    </div>

    <h2>3. Adicionando Cores Neutras e de Apoio</h2>
    <div class="color-info">
      <p>
        Cores neutras para fundos e textos, e cores de destaque para ações
        importantes:
      </p>
      <ul>
        <li>
          Cinza Claro (Neutro):
          <span class="color-box" style="background-color: #f0f0f0"></span>
          #f0f0f0
        </li>
        <li>
          Cinza Médio (Neutro para Textos/Bordas):
          <span class="color-box" style="background-color: #777777"></span>
          #777777
        </li>
        <li>
          Amarelo Pastel (Complementar/Destaque):
          <span class="color-box" style="background-color: #fffacd"></span>
          #fffacd
        </li>
        <li>
          Azul Pastel (Complementar/Destaque):
          <span class="color-box" style="background-color: #e0f2f7"></span>
          #e0f2f7
        </li>
      </ul>
    </div>

    <h2>4. Exemplo de Paleta de Cores Pastel para o Aplicativo</h2>
    <div class="color-info example-palette">
      <h3>Exemplo de Paleta:</h3>
      <ul>
        <li>
          <strong>Cor Primária (Destaque):</strong> Verde Pastel Claro
          <span class="color-box" style="background-color: #d1edb7"></span>
          #d1edb7
        </li>
        <li>
          <strong>Cor Secundária (Suporte/Destaque Suave):</strong> Verde Pastel
          <span class="color-box" style="background-color: #a8d5ad"></span>
          #a8d5ad
        </li>
        <li>
          <strong>Cor Terciária (Destaque Adicional):</strong> Amarelo Pastel
          <span class="color-box" style="background-color: #fffacd"></span>
          #fffacd ou Azul Pastel
          <span class="color-box" style="background-color: #e0f2f7"></span>
          #e0f2f7
        </li>
        <li>
          <strong>Cor de Fundo Primária:</strong> Branco
          <span class="color-box" style="background-color: #ffffff"></span>
          #ffffff
        </li>
        <li>
          <strong>Cor de Fundo Secundária:</strong> Cinza Claro
          <span class="color-box" style="background-color: #f0f0f0"></span>
          #f0f0f0
        </li>
        <li>
          <strong>Cor do Texto Principal:</strong> Cinza Médio
          <span class="color-box" style="background-color: #777777"></span>
          #777777
        </li>
      </ul>
    </div>

    <h2>5. Dicas Adicionais</h2>
    <div class="color-info">
      <ul>
        <li>
          <strong>Contraste:</strong> Garanta contraste suficiente entre texto e
          fundo para legibilidade.
        </li>
        <li>
          <strong>Hierarquia Visual:</strong> Use cores para indicar a
          importância dos elementos.
        </li>
        <li>
          <strong>Consistência:</strong> Mantenha a consistência no uso das
          cores.
        </li>
        <li>
          <strong>Testes:</strong> Teste a paleta em diferentes telas e
          iluminações.
        </li>
        <li>
          <strong>Ferramentas Online:</strong> Utilize ferramentas como Adobe
          Color, Coolors ou Paletton para explorar variações.
        </li>
        <li>
          <strong>Acessibilidade:</strong> Considere a acessibilidade para
          usuários com deficiências visuais.
        </li>
      </ul>
    </div>

    <p>
      Lembre-se de adaptar e experimentar para encontrar a melhor combinação
      para o seu aplicativo!
    </p>
  </div>
</template>

<script>
export default {
  name: "PaletaCoresPastel",
};
</script>

<style scoped>
.paleta-cores-pastel {
  font-family: sans-serif;
  line-height: 1.6;
  margin: 20px;
  background-color: #f4f4f4;
  color: #333;
}
h1,
h2 {
  color: #317d3d;
}
.color-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  margin-right: 5px;
  vertical-align: middle;
}
.color-info {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.example-palette {
  margin-top: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 5px;
}
.example-palette h3 {
  margin-top: 0;
  color: #317d3d;
}
</style>

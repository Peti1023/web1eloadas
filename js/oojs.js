class Calculator {
    constructor() {
      // Fő konténer
      this.container = document.createElement('div');
      this.container.className = "calculator";
  
      // Kijelző
      this.display = document.createElement('input');
      this.display.type = "text";
      this.display.readOnly = true;
      this.display.className = "calculator-display";
      this.display.value = "";
      this.container.appendChild(this.display);
  
      // Gombok
      this.buttonsContainer = document.createElement('div');
      this.buttonsContainer.className = "calculator-buttons";
  
      // Számok és műveleti gombok definiálása
      const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', 'C', '=', '+'
      ];
      buttons.forEach(text => {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', () => this.onButtonClick(text));
        this.buttonsContainer.appendChild(button);
      });
      this.container.appendChild(this.buttonsContainer);
  
      document.body.appendChild(this.container);
    }
    
    // Gombkattintás kezelése
    onButtonClick(value) {
      if (value === 'C') {
        this.display.value = "";
      } else if (value === '=') {
        try {
          // Egyszerű kifejezés kiértékelés
          this.display.value = eval(this.display.value);
        } catch (e) {
          this.display.value = "Error";
        }
      } else {
        this.display.value += value;
      }
    }
  }
  
  // Továbbfejlesztett számológép
  class ScientificCalculator extends Calculator {
    constructor() {
      super();
      // Tudományos gomboknak
      this.scienceContainer = document.createElement('div');
      this.scienceContainer.className = "scientific-buttons";
      
      // Gomb: négyzetgyök
      const sqrtButton = document.createElement('button');
      sqrtButton.textContent = "√";
      sqrtButton.addEventListener('click', () => this.calculateSqrt());
      this.scienceContainer.appendChild(sqrtButton);
      
      // Gomb: négyzet
      const squareButton = document.createElement('button');
      squareButton.textContent = "x²";
      squareButton.addEventListener('click', () => this.calculateSquare());
      this.scienceContainer.appendChild(squareButton);
  
      // Tudományos gombok hozzáadása
      this.container.appendChild(this.scienceContainer);
    }
    
    // Négyzetgyök számítás
    calculateSqrt() {
      try {
        const result = Math.sqrt(eval(this.display.value));
        this.display.value = result;
      } catch (e) {
        this.display.value = "Error";
      }
    }
    
    // Négyzet számítás
    calculateSquare() {
      try {
        const num = eval(this.display.value);
        this.display.value = num * num;
      } catch (e) {
        this.display.value = "Error";
      }
    }
  }

  new ScientificCalculator();
  
{
  const {
    html,
  } = Polymer;
  /**
    `<cells-slidedown-animation>` Description.

    Example:

    ```html
    <cells-slidedown-animation></cells-slidedown-animation>
    ```

    ## Styling
    The following custom properties and mixins are available for styling:

    ### Custom Properties
    | Custom Property     | Selector | CSS Property | Value       |
    | ------------------- | -------- | ------------ | ----------- |
    | --cells-fontDefault | :host    | font-family  |  sans-serif |
    ### @apply
    | Mixins    | Selector | Value |
    | --------- | -------- | ----- |
    | --cells-slidedown-animation | :host    | {} |

    * @customElement
    * @polymer
    * @extends {Polymer.Element}
    * @demo demo/index.html
  */
  class CellsSlidedownAnimation extends Polymer.Element {

    static get is() {
      return 'cells-slidedown-animation';
    }

    static get properties() {
      return {
        initialHeight: Number,
        opened: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true,
          observer: '_openedChanged'
        },
        _close: function() {
          this.set('opened', false);
        },
        _open: function() {
          this.set('opened', true);
        },
        animation: {
          type: Object,
          value: function() {
            return {
              duration: 15,
              counter: 0,
              interval: 0,
              adder: 0,
              subtractor: 0
            };
          }
        },
      };
    }

    ready() {
      super.ready();
      Polymer.RenderStatus.afterNextRender(this, function() {
        this._getDOMHeight();
      });
    }

    _getDOMHeight() {
      let el = this.$.section;
      console.log(el);
      let defStyle = el.getAttribute('style');
      el.setAttribute('style', 'display:none');
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.display = 'block';
      let wantedHeight = el.offsetHeight;
      el.setAttribute('style', defStyle);
      this.initialHeight = wantedHeight;
    }

    _doSlideUp() {
      this.animation.counter -= this.animation.subtractor;
      if (this.animation.counter > 0) {
        this.$.section.style.height = this.animation.counter + 'px';
      } else {
        this.$.section.style.height = 0;
        this.dispatchEvent(new CustomEvent('slideUp', {detail: {}}));
        clearInterval(this.animation.interval);
      }
    }
    slideUp() {
      console.log('slideUp');
      clearInterval(this.animation.interval);
      this.animation.subtractor = this.initialHeight / 10;
      this.$.section.style.overflow = 'hidden';
      this.animation.interval = setInterval(this._doSlideUp.bind(this), this.animation.duration);
    }
    _doSlideDown() {
      this.animation.counter += this.animation.adder;
      if (this.animation.counter < this.initialHeight) {
        this.$.section.style.height = this.animation.counter + 'px';
      } else {
        this.$.section.style.height = this.initialHeight + 'px';
        this.dispatchEvent(new CustomEvent('slideDown', {detail: {}}));
        clearInterval(this.animation.interval);
      }
    }
    slideDown() {
      console.log('slideDown');
      clearInterval(this.animation.interval);
      this.animation.adder = this.initialHeight / 10;
      this.animation.interval = setInterval(this._doSlideDown.bind(this), this.animation.duration);
    }
  }

  customElements.define(CellsSlidedownAnimation.is, CellsSlidedownAnimation);
}
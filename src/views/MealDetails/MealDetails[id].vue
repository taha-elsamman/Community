<template>
  <div class="meal-details-container">
    <h1 class="meal-title">Overnight Oats met aardbeien</h1>
    <div class="meal-intro">Introductie</div>
    <div class="meal-img-section">
      <div class="meal-img-stack">
        <img class="meal-img" :src="mealImgSrc" alt="Overnight oats met aardbeien" />
        <img class="meal-img-frame" src="/borders/Frame Recipe details.webp" alt="" />
        <button class="meal-fav-btn" aria-label="Add to favorites">
          <img src="/Icons/heart.webp" width="50" alt="" class="fav-icon">
        </button>
      </div>
    </div>
    <div class="meal-sections row">
      <div class="meal-ingredients col-lg-3 col-md-4 col-sm-6">
        <h2 class="meal-section-title">Ingrediënten</h2>
        <svg width="120" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
        <div class="meal-portion-select">
          <label for="portion">Aantal personen</label><br>
          <select id="portion" class="mt-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div class="meal-checkbox-group">
          <div class="meal-checkbox-label">Voor de saus</div>
          <div class="meal-checkbox-list">
            <label><input type="checkbox" /> Vegetarisch</label>
            <label><input type="checkbox" /> Vegan</label>
            <label><input type="checkbox" /> Glutenvrij</label>
            <label><input type="checkbox" /> Lactosevrij</label>
            <label><input type="checkbox" /> Koolhydraatarm</label>
            <label><input type="checkbox" /> Pescotarisch</label>
            <label><input type="checkbox" /> Suikervrij</label>
            <label><input type="checkbox" /> Notenvrij</label>
          </div>
        </div>
        <div class="meal-checkbox-group">
          <div class="meal-checkbox-label">Kooktijd</div>
          <div class="meal-checkbox-list">
            <label><input type="checkbox" /> Tot 10 min</label>
            <label><input type="checkbox" /> 10-20 min</label>
            <label><input type="checkbox" /> 20-30 min</label>
            <label><input type="checkbox" /> 30+ min</label>
          </div>
        </div>
      </div>
      <div class="meal-preparation col-lg-8 col-md-8 col-sm-12">
        <h2 class="meal-section-title">Bereidingswijze</h2>
        <svg width="120" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
        <div class="meal-step">
          <div class="meal-step-title">Stap 1</div>
          <div class="meal-step-desc">
            Cupcake ipsum dolor sit amet pie jelly-o candy. Tart I love I love marzipan pie pie chocolate bonbon donut.
            Halvah marzipan gingerbread I love I love cotton candy biscuit. Cupcake oat cake gummi bears bonbon brownie
            ice cream biscuit. Bear claw liquorice brownie caramels donut cake gummies gingerbread. Chupa chups pastry
            bonbon donut gummi bears pastry chupa chups chocolate cake. I love dragée sesame snaps macaroon gummi bears
            macaroon I love.
          </div>
        </div>
        <div class="meal-step">
          <div class="meal-step-title">Stap 2</div>
          <div class="meal-step-desc">
            Pastry tiramisu cake pie pastry donut topping. Ice cream candy I love gummies I love. Chupa chups sweet roll
            shortbread oat cake fruitcake cake. Dessert apple pie chupa chups jujubes topping oat cake icing. Jelly
            beans lemon drops shortbread carrot cake gummies croissant. Wafer shortbread dragée chocolate bar lemon
            drops.
          </div>
        </div>
        <div class="meal-step">
          <div class="meal-step-title">Stap 3</div>
          <div class="meal-step-desc">
            I love apple pie pastry pie pie dragée bear claw tootsie roll I love. Marzipan pie sugar plum chupa chups
            cookie marzipan. Soufflé lollipop gummies cake danish chocolate bar muffin. Icing I love marshmallow I love
            chocolate cake tart. Fruitcake pastry sweet roll donut gummies toffee candy canes caramels. Jelly bonbon
            gummies tiramisu sweet roll gingerbread brownie cake I love. Muffin carrot cake gingerbread I love
            fruitcake. Donut topping chocolate cake chocolate bar brownie bear claw cheesecake bonbon icing.
          </div>
        </div>
        <div class="meal-step">
          <div class="meal-step-title">Stap 4</div>
          <div class="meal-step-desc">
            Lemon drops lemon drops oat cake I love tiramisu topping. Jelly I love pudding croissant macaroon bonbon
            pastry oat cake topping. Danish icing lemon drops cheesecake ice cream jelly-o icing I love. Sesame snaps
            brownie I love candy canes cotton candy. Sugar plum I love gummies gummi bears I love cookie I love
            chocolate. Biscuit shortbread soufflé sweet roll dessert I love marshmallow sweet roll muffin. Pastry
            brownie tart I love I love.
          </div>
        </div>
        <div class="meal-step">
          <div class="meal-step-title">Stap 5</div>
          <div class="meal-step-desc">
            Dessert cake halvah sweet I love sugar plum tiramisu sesame snaps. Powder pie croissant candy liquorice
            wafer. Cookie liquorice dragée pudding halvah icing donut oat cake. Apple pie gingerbread donut toffee sweet
            roll I love I love macaroon. Marzipan jelly dragée wafer tiramisu brownie cheesecake chupa chups candy
            canes. Sweet roll icing chocolate cake soufflé topping donut wafer sesame snaps I love. Pie chocolate bar
            chocolate cake liquorice apple pie jelly tiramisu sesame snaps caramels. Powder chupa chups sesame snaps
            shortbread sesame snaps chupa chups candy canes sesame snaps. Gingerbread shortbread bear claw oat cake
            sweet halvah.
          </div>
        </div>

      </div>
    </div>
    <!-- Kookpraat Section Start -->
    <div class="kookpraat-section">
      <div class="kookpraat-title">Kookpraat</div>
      <div class="kookpraat-squiggle">
        <svg width="120" height="24" viewBox="0 0 240 24" fill="none" style="display:inline-block;">
          <path
            d="M2 12 Q12 2, 22 12 T42 12 T62 12 T82 12 T102 12 T118 12 T138 12 T158 12 T178 12 T198 12 T218 12 T238 12"
            stroke="#222" stroke-width="2" fill="none" />
        </svg>
      </div>
      <div class="kookpraat-desc">
        Vertel hieronder hoe het bij jou ging. Was het een succes, een kleine keukenramp of iets daartussenin?<br>
        Deel je tips, je tweaks en je ‘waarom doe ik dit mezelf aan’ momenten.<br>
        En als je ergens op vastloopt, gooi je vraag erin. Ik ben er.
      </div>
      <WriteCommentBox :border-color="'1.5px dashed #B3C7E6'"/>
      <CommentBox
        type="success"
        typeLabel=""
        avatar="/Icons/user (3).png"
        author="Loukie"
        time=""
        meta="Houdt van wandelen na het eten"
        body="Cupcake ipsum dolor sit amet pie jelly-o candy. Tart I love I love marzipan pie pie chocolate bonbon donut.
              Halvah marzipan gingerbread I love I love cotton candy biscuit. Cupcake oat cake gummi bears bonbon brownie
              ice cream biscuit. Bear claw liquorice brownie caramels donut cake gummies gingerbread. Chupa chups pastry
              bonbon donut gummi bears pastry chupa chups chocolate cake. I love dragée sesame snaps macaroon gummi bears
              macaroon I love."
        :color="'#666'"
        @like="onLike"
        @reply="onReply"
        @report="onReport"
      />
    </div>
    <!-- Kookpraat Section End -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import WriteCommentBox from '@/components/WriteCommentBox.vue'
import CommentBox from '@/components/CommentBox.vue'
const route = useRoute()
const id = route.params.id

const mealImages = {
  '1': '/photos/oats.png',
  '2': '/photos/apple.webp',
  '3': '/photos/tosti.jpg',
  '4': '/photos/pasta.png',
  '5': '/photos/yogurt.jpg',
  '6': '/photos/banana.webp',
  '7': '/photos/sandwich.webp',
  '8': '/photos/soup.png',
  '9': '/photos/pancakes.jpg',
  '10': '/photos/salad.jpg',
  '11': '/photos/eggs.jpg',
  '12': '/photos/pizza.jpg',
  '13': '/photos/croissant.jpg',
  '14': '/photos/lasagna.jpg',
  // ...add more as needed
}
const mealImgSrc = mealImages[id]

function onLike() {
  // TODO: Implement like functionality
  alert('Like clicked');
}
function onReply() {
  // TODO: Implement reply functionality
  alert('Reageer clicked');
}
function onReport() {
  // TODO: Implement report functionality
  alert('Melden clicked');
}
</script>

<style scoped>
.meal-details-container {
  margin: auto;
  max-width: 1200px;
  font-family: 'Indie Flower', cursive, sans-serif;
  color: #7fa184;
  padding: 2rem;
}

.meal-title {
  text-align: center;
  font-size: 2.2rem;
  color: #7fa184;
  margin-bottom: 0.2rem;
  font-weight: 400;
}

/* Responsive font size for meal-title */
@media (max-width: 900px) {
  .meal-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 600px) {
  .meal-title {
    font-size: 1.2rem;
  }
}

.meal-intro {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.meal-img-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.meal-img-stack {
  position: relative;
  display: flex;
  width: 80%;
  max-width: none;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.meal-img {
  position: absolute;
  top: 40px;
  display: block;
  width: 90%;
  height: auto;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.meal-img-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 115%;
  height: 115%;
  z-index: 2;
  pointer-events: none;
}

.meal-fav-btn {
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 3;
  padding: 0;
}

.meal-fav-btn img {
  margin-top: 50px;
  margin-right: 30px;
  width: 50px;
  height: auto;
}

/* Responsive fav-icon size */
@media (max-width: 1200px) {
  .meal-fav-btn img {
    width: 36px;
    margin-top: 35px;
    margin-right: 18px;
  }
}

@media (max-width: 900px) {
  .meal-fav-btn img {
    width: 36px;
    margin-top: 50px;
    margin-right: 18px;
  }
}

@media (max-width: 600px) {
  .meal-fav-btn img {
    width: 28px;
    margin-top: 15px;
    margin-right: 10px;
  }
}

@media (max-width: 599px) {
  .meal-fav-btn img {
    width: 28px;
    margin-top: 35px;
    margin-right: 10px;
  }

}

.meal-sections {
  margin-top: 2.5rem;
}

.meal-ingredients {
  /* Bootstrap col-3 will handle width */
  min-width: 0;
  max-width: 100%;
}

.meal-preparation {
  /* Bootstrap col-9 will handle width */
  min-width: 0;
  max-width: 100%;
}

.meal-section-title {
  font-size: 1.3rem;
  color: #a3b1c6;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.meal-portion-select {
  margin-bottom: 1.2rem;
}

.meal-portion-select label {
  color: #b3b3b3;
  font-size: 1.05rem;
  margin-right: 0.5rem;
}

.meal-portion-select select {
  font-size: 1rem;
  border: 1px solid #b3d6f6;
  border-radius: 0.4rem;
  padding: 0.2rem 0.7rem;
  color: #7fa184;
  background: #f8f8f8;
}

.meal-checkbox-group {
  margin-bottom: 1.2rem;
}

.meal-checkbox-label {
  color: #b3b3b3;
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}

.meal-checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meal-checkbox-list label {
  color: #7fa184;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
}

.meal-checkbox-list input[type="checkbox"] {
  accent-color: #7fd6c2;
  margin-right: 0.5rem;
}

.meal-preparation {
  margin-left: 1.5rem;
}

.meal-step {
  margin-bottom: 1.5rem;
}

.meal-step-title {
  color: #a3b1c6;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.meal-step-desc {
  color: #888;
  font-size: 1rem;
  line-height: 1.6;
}

.kookpraat-comment {
  display: flex;
  align-items: flex-start;
  margin: 0 2.5rem 2.5rem 2.5rem;
  box-sizing: border-box;
  gap: 1.2rem;
}

@media (min-width: 900px) and (max-width: 991px) {
  .meal-sections {
    flex-direction: column;
    gap: 1.5rem;
  }

  .meal-preparation {
    margin-left: 0;
  }

  .meal-img-stack {
    position: relative;
    display: flex;
    width: 80%;
    max-width: none;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  .meal-img-frame {
    width: 100%;
    min-width: 0;
    height: auto;
  }


}

@media (max-width: 899px) {
  .meal-sections {
    flex-direction: column;
    gap: 1.5rem;
  }

  .meal-preparation {
    margin-left: 0;
  }

  .meal-img-stack {

    position: relative;
    display: flex;
    width: 90%;
    max-width: none;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  .meal-img-frame {
    width: 100%;
    min-width: 0;
    height: auto;
  }

  .meal-img {
    width: 95%;
  }

  .kookpraat-comment {
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 600px) {
  .meal-details-container {
    padding: 2rem;
  }

  .meal-img-stack {

    position: relative;
    display: flex;
    width: 100%;
    max-width: none;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }


  .meal-img-frame {
    width: 100%;
    max-width: 90vw;
    min-width: 0;
    height: auto;
    margin-top: 10px;
  }

  .meal-sections {
    gap: 0.7rem;
  }
}

/* Kookpraat Section Styles */
.kookpraat-section {
  width: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  background: #fff;
  margin-top: 3rem;
  padding: 2.5rem 0 3rem 0;
  border-radius: 0;
  box-sizing: border-box;
  border-top: 1px solid #eaeaea;
}

.kookpraat-title {
  color: #b3c7e6;
  font-size: 2rem;
  font-family: inherit;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.kookpraat-squiggle {
  margin-bottom: 1.2rem;
}

.kookpraat-desc {
  color: #888;
  font-size: 1.08rem;
  margin-bottom: 2.2rem;
  word-break: break-word;
}
.kookpraat-comment-header
{
  color: #7fa184;
  font-size: 1.08rem;
}
.kookpraat-action
{
  color: #7fa184 !important;
  font-size: 1.08rem;
}

.kookpraat-comment-body
{
  color: #888;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Responsive styles for kookpraat-desc */
@media (max-width: 900px) {
  .kookpraat-desc {
    margin-left: 1rem;
    margin-right: 1rem;
    max-width: 100%;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .kookpraat-desc {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    max-width: 100vw;
    font-size: 0.97rem;
    line-height: 1.5;
  }
}

.kookpraat-form-row {
  display: flex;
  align-items: flex-start;
  margin: 0 2.5rem 2.5rem 2.5rem;
  width: calc(100% - 5rem);
  box-sizing: border-box;
  gap: 1.2rem;
}

.kookpraat-form {
  display: flex;
  flex: 1 1 auto;
  align-items: flex-start;
  background: #fcfcfc;
  border: 1px dashed #b3c7e6;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  gap: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
}

.kookpraat-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
}

/* Responsive styles for Kookpraat form row */
@media (max-width: 900px) {
  .kookpraat-form-row {
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }
}

@media (max-width: 600px) {
  .kookpraat-form-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    width: calc(100% - 0.4rem);
  }

  .kookpraat-avatar {
    width: 38px;
    height: 38px;
    margin-bottom: 0.5rem;
  }

  .kookpraat-form {
    padding: 1rem 0.5rem;
  }
}

.kookpraat-action {
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  color: #7fa184;
  font-size: 0.9rem;
  padding-right: 10px;
  font-family: inherit;
}

.kookpraat-action:hover {
  color: #b3b3b3;
  text-decoration: underline;
}

.kookpraat-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kookpraat-input {
  width: 100%;
  min-height: 48px;
  border: none;
  background: transparent;
  font-size: 1.08rem;
  color: #7fa184;
  font-family: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  padding: 0.5rem 0.7rem;
}

.kookpraat-input-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 0;
  justify-content: space-between;
  gap: 0.5rem;
}

.comment-btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.send-message {
  display: flex;
  align-items: center;
}

.send-message img {
  cursor: pointer;
  transition: opacity 0.2s;
}
.comment-btns img {
  cursor: pointer;
  transition: opacity 0.2s;
}
.send-message img:hover {
  opacity: 0.7;
}
.comment-btns img:hover {
  opacity: 0.7;
}


/* Responsive adjustments */
@media (max-width: 600px) {
  .kookpraat-input-actions {
    gap: 0.3rem;
  }
  .comment-btns {
    gap: 0.3rem;
  }
}
</style>

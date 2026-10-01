<script setup>
// Playable slice of the EXP Connect question deck, using the real card prompts and
// the final rules: answer → discard one card, refuse → draw two, can't win by discarding.
import { ref, reactive, computed } from 'vue'
import DemoFrame from '../DemoFrame.vue'

const LEVELS = [
  {
    key: 'green', n: 1, name: 'Integration', color: '#a7d3bb',
    blurb: 'Easy and carefree — perfect for ice breaking.',
    qs: [
      'What are you surprisingly good at?',
      'What’s one thing you enjoy doing alone?',
      'What’s one small thing that made you smile recently?',
      'What’s your go-to comfort food?',
      'How do you relax after a long day?',
      'What’s one little thing you do that reflects your personality?',
      'One thing people usually get wrong about me at first is…',
    ],
  },
  {
    key: 'yellow', n: 2, name: 'Connection', color: '#f2dfb0',
    blurb: 'Slowly opens up — talk about your identity.',
    qs: [
      'What kind of feedback works best for you?',
      'What makes collaboration difficult for you personally?',
      'When do you feel most confident during projects?',
      'I struggle to speak up when ______.',
      'In group work, I usually take on the role of ______.',
      'What’s one habit you bring into your (group) work from your background or past experience?',
      'I feel most uncomfortable when ___',
    ],
  },
  {
    key: 'red', n: 3, name: 'Trust', color: '#e8a29c',
    blurb: 'The toughest — encourages deep thinking.',
    qs: [
      'What helps you feel like you belong when joining something new?',
      'What’s the biggest thing holding you back from becoming the person you want to be?',
      'If you could ask your younger self one question, what would it be and why?',
      'What’s something you’re afraid to admit you deeply care about?',
      'What’s something about you that you rarely get to explain properly?',
      'People often misunderstand ___ about my background.',
      'What’s a moment when you realized not everyone sees the world the way you do?',
    ],
  },
]

const decks = reactive(Object.fromEntries(LEVELS.map((l) => [l.key, [...l.qs].sort(() => Math.random() - 0.5)])))
const card = ref(null) // { level, q }
const flipped = ref(false)
const hand = ref(5)
const log = ref([])
const msg = ref('')

const draw = (l) => {
  if (card.value && flipped.value) return
  if (!decks[l.key].length) decks[l.key] = [...l.qs].sort(() => Math.random() - 0.5)
  card.value = { level: l, q: decks[l.key][0] }
  flipped.value = false
  msg.value = ''
  requestAnimationFrame(() => requestAnimationFrame(() => (flipped.value = true)))
}

const resolve = (answered) => {
  if (!card.value) return
  if (answered) {
    if (hand.value <= 1) {
      msg.value = 'Rule 4: you cannot win using the discard function.'
    } else {
      hand.value -= 1
      msg.value = 'Answered — discard one card from your hand.'
    }
  } else {
    hand.value += 2
    msg.value = 'Refused — discard the card, but draw 2.'
  }
  log.value.unshift({ l: card.value.level, ok: answered })
  log.value = log.value.slice(0, 12)
  // the drawn question goes to the bottom of its deck
  const d = decks[card.value.level.key]
  d.push(d.shift())
  flipped.value = false
  setTimeout(() => (card.value = null), 250)
}

const retire = () => {
  if (!card.value) return
  const d = decks[card.value.level.key]
  d.shift()
  msg.value = 'Question retired from the deck forever.'
  flipped.value = false
  setTimeout(() => (card.value = null), 250)
}

const reset = () => {
  hand.value = 5; log.value = []; msg.value = ''; card.value = null
  LEVELS.forEach((l) => (decks[l.key] = [...l.qs].sort(() => Math.random() - 0.5)))
}
const answeredPct = computed(() => (log.value.length ? Math.round((log.value.filter((x) => x.ok).length / log.value.length) * 100) : 0))
</script>

<template>
  <DemoFrame title="Draw a question card" code="EXPC · Q-DECK">
    <div class="qd">
      <div class="decks">
        <button
          v-for="l in LEVELS" :key="l.key" class="deck" :style="{ '--c': l.color }"
          @click="draw(l)" :disabled="!!card"
        >
          <span class="stack" aria-hidden="true"><i /><i /><i /></span>
          <span class="dl mono">Level {{ l.n }}</span>
          <b>{{ l.name }}</b>
          <small>{{ l.blurb }}</small>
          <span class="left mono">{{ decks[l.key].length }} cards</span>
        </button>
      </div>

      <div class="table">
        <div class="slot" :class="{ has: card }">
          <div v-if="card" class="card" :class="{ flipped }" :style="{ '--c': card.level.color }">
            <div class="face back"><span class="mono">EXP</span><span>connect</span></div>
            <div class="face front">
              <p>{{ card.q }}</p>
              <span class="mono">Level {{ card.level.n }}: {{ card.level.name }}</span>
            </div>
          </div>
          <p v-else class="mono empty">Pick a deck to draw</p>
        </div>

        <div class="actions">
          <div class="hand">
            <span class="label">Your hand</span>
            <div class="cards" aria-live="polite">
              <TransitionGroup name="h">
                <i v-for="n in hand" :key="n" />
              </TransitionGroup>
            </div>
            <span class="mono hn">{{ hand }} card{{ hand === 1 ? '' : 's' }}</span>
          </div>
          <div class="btns">
            <button class="btn" :disabled="!card" @click="resolve(true)">Answer · discard 1</button>
            <button class="btn ghost" :disabled="!card" @click="resolve(false)">Refuse · draw 2</button>
            <button class="chip" :disabled="!card" @click="retire">Retire question</button>
          </div>
          <p class="msg mono" aria-live="polite">{{ msg }}</p>
        </div>
      </div>
    </div>
    <template #foot>
      <span>Session: {{ log.length }} drawn · {{ answeredPct }}% answered</span>
      <button class="reset" @click="reset">reset</button>
    </template>
  </DemoFrame>
</template>

<style scoped>
.decks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.deck {
  position: relative; text-align: left; display: flex; flex-direction: column; gap: 4px;
  padding: 14px; border: 1px solid var(--line); border-radius: 6px; background: var(--bg); cursor: pointer;
  transition: transform .15s, border-color .15s;
}
.deck:not(:disabled):hover { transform: translateY(-2px); border-color: var(--ink); }
.deck:disabled { opacity: .55; cursor: default; }
.stack { position: relative; height: 34px; margin-bottom: 8px; }
.stack i { position: absolute; width: 26px; height: 34px; border-radius: 3px; background: var(--c); border: 1px solid rgba(0,0,0,.15); }
.stack i:nth-child(2) { left: 5px; top: -2px; } .stack i:nth-child(3) { left: 10px; top: -4px; }
.dl { font-size: 10px; color: var(--muted); }
.deck b { font: 700 18px var(--f-display); }
.deck small { color: var(--muted); font-size: 12px; line-height: 1.35; }
.left { position: absolute; top: 14px; right: 14px; font-size: 10px; color: var(--faint); }

.table { display: grid; grid-template-columns: 200px 1fr; gap: 24px; margin-top: 20px; align-items: center; }
.slot { height: 260px; display: grid; place-items: center; border: 1px dashed var(--line-strong); border-radius: 8px; perspective: 900px; }
.slot.has { border-color: transparent; }
.empty { font-size: 11px; color: var(--faint); }
.card { width: 180px; height: 250px; position: relative; transform-style: preserve-3d; transition: transform .55s cubic-bezier(.3,1.3,.5,1); }
.card.flipped { transform: rotateY(180deg); }
.face { position: absolute; inset: 0; border-radius: 10px; backface-visibility: hidden; display: flex; flex-direction: column; box-shadow: 0 10px 30px -12px rgba(0,0,0,.45); }
.back { background: #141414; color: #fff; align-items: center; justify-content: center; font: 800 32px/0.9 var(--f-display); }
.back span:last-child { font: 400 22px var(--f-sans); font-style: italic; }
.front { transform: rotateY(180deg); background: var(--c); color: #1a1a1a; padding: 18px; justify-content: center; text-align: center; }
.front p { font-size: 16px; line-height: 1.35; flex: 1; display: grid; place-items: center; }
.front .mono { font-size: 9px; opacity: .7; }

.hand { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cards { display: flex; min-height: 30px; flex-wrap: wrap; }
.cards i { width: 20px; height: 28px; border-radius: 3px; background: var(--ink); border: 2px solid var(--panel); margin-right: -8px; }
.hn { font-size: 11px; color: var(--muted); margin-left: 10px; }
.h-enter-active, .h-leave-active { transition: all .25s; }
.h-enter-from { opacity: 0; transform: translateY(-10px); }
.h-leave-to { opacity: 0; transform: translateY(10px); }
.btns { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; align-items: center; }
.btns .btn { padding: 11px 14px; font-size: 11px; }
.btn:disabled, .chip:disabled { opacity: .4; pointer-events: none; }
.msg { min-height: 18px; font-size: 11px; color: var(--signal-ink); margin-top: 12px; }
.reset { margin-left: auto; background: none; border: 0; font: inherit; color: var(--muted); cursor: pointer; text-decoration: underline; }
:deep(.df) { display: flex; }

@media (max-width: 640px) {
  .decks { grid-template-columns: 1fr; }
  .deck { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 4px 10px; }
  .deck small, .stack { display: none; }
  .table { grid-template-columns: 1fr; }
}
</style>

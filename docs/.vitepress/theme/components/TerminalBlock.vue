<template>
	<div class="terminal-block">
		<div
			v-if="title"
			class="terminal-block__header"
		>
			<span class="terminal-block__dot terminal-block__dot--red" />
			<span class="terminal-block__dot terminal-block__dot--yellow" />
			<span class="terminal-block__dot terminal-block__dot--green" />
			<span class="terminal-block__title">{{ title }}</span>
		</div>
		<div class="terminal-block__body"><slot /></div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title?: string;
}>();
</script>

<style lang="css">
.terminal-block {
  margin: 16px 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: #111214;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.terminal-block__header {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #181a1f;
}

.terminal-block__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.terminal-block__dot--red {
  background: #ff5f57;
}

.terminal-block__dot--yellow {
  background: #febc2e;
}

.terminal-block__dot--green {
  background: #28c840;
}

.terminal-block__title {
  margin-left: 6px;
  font-size: 12px;
  color: #a1a1aa;
}

.terminal-block__body {
  margin: 0;
  padding: 16px 18px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.65;
  color: #e4e4e7;
  background: transparent;
  white-space: pre-wrap;
}

.terminal-block__body code,
.terminal-block__body {
  font-family: var(--vp-font-family-mono);
}

.terminal-line {
  display: block;
  min-height: 1.65em;
}

.terminal-indent-1 {
  padding-left: 2ch;
}

.terminal-indent-2 {
  padding-left: 4ch;
}

.terminal-indent-3 {
  padding-left: 6ch;
}

.terminal-muted {
  color: #a1a1aa;
}

.terminal-success {
  color: #4ade80;
}

.terminal-info {
  color: #7dd3fc;
}

.terminal-error {
  color: #f87171;
}

.terminal-key {
  color: #c084fc;
}

.terminal-value {
  color: #facc15;
}
</style>

<template>
  <p>Scan the code in your MetaMask mobile app</p>
  <div class="qr-frame">
    <canvas ref="qrCanvas"></canvas>
  </div>
  <p class="uri-label">Or copy the connection URI:</p>
  <div class="uri-display">
    <code>{{ uri }}</code>
    <Button @click="copyUri" class="copy-button" :class="{ copied: isCopied }">
      <Icon :type="isCopied ? 'checkmark' : 'copy'" />
    </Button>
  </div>
</template>

<script setup>
import QRCode from 'qrcode'

const props = defineProps({
  uri: {
    type: String,
    required: true,
  },
})

const qrCanvas = ref(null)
const { copy, copied: isCopied } = useClipboard()

const generateQR = async () => {
  if (!qrCanvas.value || !props.uri) return

  try {
    await QRCode.toCanvas(qrCanvas.value, props.uri, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
  } catch (error) {
    console.error('Failed to generate QR code:', error)
  }
}

const copyUri = () => copy(props.uri)

// Generate QR code when URI changes
watch(() => props.uri, generateQR, { immediate: true })

onMounted(() => {
  generateQR()
})
</script>

<style scoped>
p {
  text-align: center;
  @mixin ui-font;
  color: var(--muted);
}

.qr-frame {
  background: white;
  padding: var(--spacer-sm);
  max-width: 15rem;
  max-height: 15rem;
  border: var(--border);
  border-radius: var(--border-radius-sm, 0.5rem);
  margin: 0 auto;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
}

.uri-display {
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
  background: var(--color-bg-secondary);
  border: var(--border);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  padding: 0;

  code {
    flex: 1;
    font-size: var(--font-xs);
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    padding: var(--spacer-sm) var(--spacer);
    color: var(--muted);
  }

  .copy-button {
    flex-shrink: 0;
    padding: var(--spacer-xs);
    min-width: auto;
    margin: -1px;

    &.copied {
      color: var(--color-success);
    }
  }
}
</style>

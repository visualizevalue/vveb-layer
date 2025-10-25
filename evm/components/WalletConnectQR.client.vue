<template>
  <div class="qr-header">
    <h2>Scan with your wallet</h2>
    <p>Use your mobile wallet app to scan this QR code</p>
  </div>
  <div class="qr-container">
    <img :src="uri" alt="">
    <canvas ref="qrCanvas" class="qr-canvas"></canvas>
  </div>
  <div class="qr-footer">
    <p class="uri-label">Or copy the connection URI:</p>
    <div class="uri-display">
      <code>{{ truncatedUri }}</code>
      <Button @click="copyUri" class="copy-button" :class="{ copied: isCopied }">
        <Icon :type="isCopied ? 'check' : 'copy'" />
      </Button>
    </div>
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
const isCopied = ref(false)

const truncatedUri = computed(() => {
  if (props.uri.length <= 50) return props.uri
  return `${props.uri.slice(0, 30)}...${props.uri.slice(-20)}`
})

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

const copyUri = async () => {
  try {
    await navigator.clipboard.writeText(props.uri)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy URI:', error)
  }
}

// Generate QR code when URI changes
watch(() => props.uri, generateQR, { immediate: true })

onMounted(() => {
  generateQR()
})
</script>

<style scoped>
.wallet-connect-qr {
  display: flex;
  flex-direction: column;
  gap: var(--spacer);
  padding: var(--spacer);
}

.qr-header {
  text-align: center;

  h2 {
    margin: 0 0 var(--spacer-xs);
    font-size: var(--font-size-lg);
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacer);
  background: white;
  border-radius: var(--border-radius);
  border: var(--border);
}

.qr-canvas {
  display: block;
  max-width: 100%;
  height: auto;
}

.qr-footer {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-xs);

  .uri-label {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .uri-display {
    display: flex;
    align-items: center;
    gap: var(--spacer-xs);
    padding: var(--spacer-sm);
    background: var(--color-bg-secondary);
    border: var(--border);
    border-radius: var(--border-radius-sm);

    code {
      flex: 1;
      font-size: var(--font-size-xs);
      font-family: monospace;
      word-break: break-all;
      color: var(--color-text);
    }

    .copy-button {
      flex-shrink: 0;
      padding: var(--spacer-xs);
      min-width: auto;

      &.copied {
        color: var(--color-success);
      }
    }
  }
}
</style>

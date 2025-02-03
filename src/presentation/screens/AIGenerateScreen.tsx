import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {generateText} from '../../infrastructure/services/HuggingFaceService';

export const AIGenerateScreen = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{role: 'user' | 'assistant'; content: string}>
  >([]);
  const [error, setError] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  const sendMessage = async () => {
    if (!userInput.trim()) {
      setError('Please enter your message');
      return;
    }

    setLoading(true);
    setError('');
    const newUserMessage = {role: 'user' as const, content: userInput};
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    try {
      const lastMessages = messages.slice(-4);
      const context = lastMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const response = await generateText({
        userInput,
        language,
        context: lastMessages.length > 0 ? context : undefined,
      });

      console.log('Response:', response);

      const newAssistantMessage = {
        role: 'assistant' as const,
        content: response.generated_text.trim(),
      };
      setMessages(prev => [...prev, newAssistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate response';
      setError(errorMessage);
      console.error('AI Generation Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.languageSelector}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'en' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('en')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'en' && styles.languageButtonTextActive,
                  ]}>
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'id' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('id')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'id' && styles.languageButtonTextActive,
                  ]}>
                  Indonesia
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chatContainer}>
              {messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    message.role === 'user'
                      ? styles.userMessage
                      : styles.assistantMessage,
                  ]}>
                  <Text
                    style={[
                      styles.messageText,
                      message.role === 'user'
                        ? styles.userMessageText
                        : styles.assistantMessageText,
                    ]}>
                    {message.content}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.chatInput}
                value={userInput}
                onChangeText={setUserInput}
                placeholder={
                  language === 'en'
                    ? 'Type your message...'
                    : 'Ketik pesan Anda...'
                }
                placeholderTextColor="#666"
                editable={!loading}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendButton, loading && styles.buttonDisabled]}
                onPress={sendMessage}
                disabled={loading}>
                <Text style={styles.sendButtonText}>
                  {loading ? '...' : '→'}
                </Text>
              </TouchableOpacity>
            </View>

            {loading && (
              <ActivityIndicator style={styles.loader} color="#007AFF" />
            )}

            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Add these new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    gap: 10,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  languageButtonActive: {
    backgroundColor: '#007AFF',
  },
  languageButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  error: {
    color: '#FF3B30',
    marginVertical: 16,
    textAlign: 'center',
  },
  loader: {
    marginTop: 16,
  },
});
